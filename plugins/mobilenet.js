import * as tf from "@tensorflow/tfjs";

class MobileNet {
  constructor(classes, epochs = 50, batchSize = 16, learningRate = 1e-3) {
    this.classes = classes;
    this.epochs = epochs;
    this.batchSize = batchSize;
    this.learningRate = learningRate;
  }

  async getTensors(samples) {
    let imageTensors = [];
    let labelTensors = [];

    for (const [clsName, cls] of Object.entries(samples)) {
      await Promise.all(
        cls.samples.map((sample) =>
          this.getImage(sample)
            .then((img) => tf.browser.fromPixelsAsync(img))
            .then((tensor) => {
              imageTensors.push(tensor);
              labelTensors.push(tf.oneHot(cls.id - 1, this.classes));
            })
        )
      );
    }
    const images = tf.stack(imageTensors);
    const labels = tf.stack(labelTensors);

    return { images, labels };
  }

  getImage(url) {
    var img = new Image();
    return new Promise((resolve) => {
      img.onload = function () {
        resolve(img);
      };
      img.src = url;
    });
  }

  async load(json) {
    this.classes = json.classes;
    const weightData = new Uint8Array(Buffer.from(json.weightData, "base64"))
      .buffer;
    this.model = await tf.loadLayersModel(
      tf.io.fromMemory(json.modelTopology, json.weightSpecs, weightData)
    );
  }
  async save() {
    let result = await this.model.save(
      tf.io.withSaveHandler(async (modelArtifacts) => modelArtifacts)
    );
    result.weightData = Buffer.from(result.weightData).toString("base64");
    result.classes = this.classes;
    return result;
  }

  async create() {
    const trainableLayers = [
      "denseModified",
      "conv_pw_13_bn",
      "conv_pw_13",
      "conv_dw_13_bn",
      "conv _dw_13",
    ];
    const mobilenet = await tf.loadLayersModel(
      "https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json"
    );

    const x = mobilenet.getLayer("global_average_pooling2d_1");
    const predictions = tf.layers
      .dense({
        units: this.classes,
        activation: "softmax",
        name: "denseModified",
      })
      .apply(x.output);

    let mobilenetModified = tf.model({
      inputs: mobilenet.input,
      outputs: predictions,
      name: "modelModified",
    });

    this.model = this._freeze(trainableLayers, mobilenetModified);

    this.model.compile({
      loss: "categoricalCrossentropy",
      optimizer: tf.train.adam(this.learning_rate),
      metrics: ["accuracy", "crossentropy"],
    });
  }

  _freeze(trainableLayers, mobilenetModified) {
    for (const layer of mobilenetModified.layers) {
      layer.trainable = false;
      for (const tobeTrained of trainableLayers) {
        if (layer.name.indexOf(tobeTrained) === 0) {
          layer.trainable = true;
          break;
        }
      }
    }
    return mobilenetModified;
  }

  async finetune(samples, beginCallback, batchCallback, epochCallback) {
    const { images, labels } = await this.getTensors(samples);

    return await this.model
      .fit(images, labels, {
        epochs: this.epochs,
        batchSize: this.batchSize,
        validationSplit: 0.2,
        callbacks: {
          onTrainingBegin: beginCallback,
          onBatchEnd: batchCallback,
          onEpochEnd: epochCallback,
        },
      })
      .then((info) => {
        images.dispose();
        labels.dispose();
        return info;
      });
  }

  async predict(url) {
    let tensor = await this.getImage(url).then((img) =>
      tf.browser.fromPixels(img)
    );
    tensor = tensor.expandDims(0);

    const prediction = await this.model
      .predict(tensor, { batchSize: 1 })
      .data();
    return prediction;
  }
}

export default MobileNet;
