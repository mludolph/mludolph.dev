import Vue from "vue";
import VueTailwind from "vue-tailwind";
import {
  TSelect,
  TRadio,
  TCheckbox,
  TButton,
  TInputGroup,
  TRichSelect,
  TDatepicker,
  TTag,
  TToggle,
  TAlert,
  TModal,
  TDialog,
  TDropdown,
  TTable,
} from "vue-tailwind/dist/components";

const settings = {
  "t-table": {
    component: TTable,
    props: {
      classes: {
        table: "min-w-full divide-y divide-gray-200 text-sm",
        thead: "",
        theadTr: "",
        theadTh: "caption text-xs text-left text-gray-500 border-b px-3 py-2",
        tbody: "divide-y divide-gray-200",
        tr: "cursor-pointer hover:bg-linen-200 group-hover:bg-linen-200",
        td: "px-3 py-3 whitespace-no-wrap",
        tfoot: "",
        tfootTr: "",
        tfootTd: "",
      },
      variants: {
        thin: {
          td: "p-1 whitespace-no-wrap text-sm",
          theadTh: "p-1 font-semibold text-left bg-gray-100 border-b text-sm",
        },
      },
    },
  },

  /*
  't-input': {
    component: TInput,
    props: {
      fixedClasses:
        'block w-full px-3 py-1 transition duration-100 ease-in-out rounded shadow-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-75',
      classes: ' placeholder-gray-400 bg-linen-200 ',
    },
  },
  */
  "t-select": {
    component: TSelect,
    props: {
      fixedClasses:
        "block w-full pl-3 pr-10 py-1 transition duration-100 ease-in-out border rounded shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm placeholder-gray-600 bg-gray-500 border-gray-400 focus:border-indigo-500",
      classes: "",
    },
  },
  "t-radio": {
    component: TRadio,
    props: {
      fixedClasses:
        "transition duration-100 ease-in-out shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0  disabled:opacity-50 disabled:cursor-not-allowed",
      classes: "text-indigo-500 border-gray-300",
      variants: {
        error: "text-red-500 border-red-300",
        success: "text-green-500 border-green-300",
      },
    },
  },
  "t-checkbox": {
    component: TCheckbox,
    props: {
      fixedClasses:
        "transition duration-100 ease-in-out rounded shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed",
      classes: "text-indigo-500 border-gray-300 ",
      variants: {
        error: "text-red-500 border-red-300",
        success: "text-green-500 border-green-300",
      },
    },
  },
  "t-button": {
    component: TButton,
    props: {
      fixedClasses:
        "transition duration-100 ease-in-out focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm",
      classes:
        "block px-3 py-1 h-fit-content text-white bg-indigo-500 border border-transparent shadow-sm rounded hover:bg-indigo-400-600 disabled:bg-indigo-500 focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500",
      variants: {
        menu: "block w-full px-4 py-1 my-1 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100",
        secondary:
          "block px-3 py-1  border border-transparent rounded hover:bg-linen-200 disabled:bg-transparent text-sm",
        secondaryDark:
          "block px-3 py-1 border border-transparent rounded bg-linen-200 hover:bg-gray-200 disabled:bg-transparent text-sm whitespace-nowrap uppercase tracking-tight font-semibold",
        danger:
          "block px-3 py-1 text-white bg-red-500 border border-transparent shadow-sm rounded hover:bg-red-600 disabled:bg-red-500 focus:ring-red-500 focus:ring-2 text-sm",
        plain: "block px-3 py-1 text-sm",
        icon: "flex items-center text-center bg-transparent focus:ring-0",
        iconGray:
          "flex items-center text-center text-gray-500 hover:text-gray-800 bg-transparent focus:ring-0",
      },
    },
  },
  "t-input-group": {
    component: TInputGroup,
    props: {
      fixedClasses: {
        wrapper: "",
        label: "block",
        body: "",
        feedback: " text-sm text-sm",
        description: "text-gray-400 text-sm",
      },
      classes: {
        wrapper: "",
        label: "",
        body: "",
        feedback: "text-gray-400",
        description: "text-gray-400",
      },
      variants: {
        danger: {
          label: "text-red-500",
          feedback: "text-red-500",
        },
        success: {
          label: "text-green-500",
          feedback: "text-green-500",
        },
      },
    },
  },
  "t-rich-select": {
    component: TRichSelect,
    props: {
      fixedClasses: {
        wrapper: "relative w-full",
        buttonWrapper: "flex flex-row relative w-full",
        selectButton:
          "w-full flex text-left text-sm justify-between items-center px-3 py-1 transition duration-100 ease-in-out border rounded-md focus:border-indigo-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
        selectButtonLabel: "block truncate",
        selectButtonPlaceholder: "block truncate",
        selectButtonIcon: "fill-current flex-shrink-0 ml-1 h-4 w-4",
        selectButtonClearButton:
          "flex flex-shrink-0 self-center items-center justify-center justify-self-center mr-2 absolute right-0 h-6 w-6 transition duration-100 ease-in-out focus:outline-none",
        selectButtonClearIcon: "fill-current h-3 w-3",
        dropdown:
          "absolute w-full z-10 -mt-1 absolute border-b border-l border-r rounded-b shadow-sm z-10",
        dropdownFeedback: "",
        loadingMoreResults: "",
        optionsList: "overflow-auto",
        searchWrapper: "inline-block w-full",
        searchBox: "inline-block w-full",
        optgroup: "",
        option: "cursor-pointer",
        disabledOption: "opacity-50 cursor-not-allowed",
        highlightedOption: "cursor-pointer",
        selectedOption: "cursor-pointer",
        selectedHighlightedOption: "cursor-pointer",
        optionContent: "",
        optionLabel: "truncate block",
        selectedIcon: "hidden",
        enterClass: "",
        enterActiveClass: "",
        enterToClass: "",
        leaveClass: "",
        leaveActiveClass: "",
        leaveToClass: "",
      },
      classes: {
        wrapper: "",
        buttonWrapper: "",
        selectButton: "bg-linen-200 border-gray-200",
        selectButtonLabel: "",
        selectButtonPlaceholder: "text-gray-400",
        selectButtonIcon: "text-gray-600",
        selectButtonClearButton: "text-gray-600 hover:text-gray-400",
        selectButtonClearIcon: "",
        dropdown: "bg-linen-200 border-gray-200 shadow-sm p-1",
        dropdownFeedback: "pb-2 px-3 text-gray-400 text-sm",
        loadingMoreResults: "pb-2 px-3 text-gray-400 text-sm",
        optionsList: "",
        searchWrapper: "p-2 placeholder-gray-400",
        searchBox:
          "px-3 py-1 bg-gray-50 text-sm rounded border focus:outline-none focus:shadow-outline border-gray-300",
        optgroup: "text-gray-400 uppercase text-xs py-1 px-2 font-semibold",
        option: "rounded-sm",
        disabledOption: "",
        highlightedOption: "bg-indigo-400-100 rounded-sm",
        selectedOption:
          "font-semibold bg-indigo-400-400 font-semibold text-white rounded-sm",
        selectedHighlightedOption:
          "font-semibold bg-indigo-400-400 font-semibold text-white rounded-sm",
        optionContent: "flex justify-between items-center text-sm px-3 py-1",
        optionLabel: "",
        selectedIcon: "",
        enterClass: "",
        enterActiveClass: "opacity-0 transition ease-out duration-100",
        enterToClass: "opacity-100",
        leaveClass: "transition ease-in opacity-100",
        leaveActiveClass: "",
        leaveToClass: "opacity-0 duration-75",
      },
      variants: {},
    },
  },
  "t-datepicker": {
    component: TDatepicker,
    props: {
      fixedClasses: {
        navigator: "flex",
        navigatorViewButton: "flex items-center",
        navigatorViewButtonIcon: "flex-shrink-0 h-5 w-5",
        navigatorViewButtonBackIcon: "flex-shrink-0 h-5 w-5",
        navigatorLabel: "flex items-center py-1",
        navigatorPrevButtonIcon: "h-6 w-6 inline-flex",
        navigatorNextButtonIcon: "h-6 w-6 inline-flex",
        inputWrapper: "flex flex-row relative",
        viewGroup: "inline-flex flex-wrap",
        view: "w-64",
        calendarDaysWrapper: "grid grid-cols-7",
        calendarHeaderWrapper: "grid grid-cols-7",
        monthWrapper: "grid grid-cols-4",
        yearWrapper: "grid grid-cols-4",
        input:
          "block w-full px-3 py-1 bg-linen-200 transition duration-100 ease-in-out border rounded text-sm focus:border-indigo-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
        clearButton:
          "flex flex-shrink-0 self-center items-center justify-center justify-self-center absolute right-2 h-6 w-6 focus:outline-none",
        clearButtonIcon: "fill-current h-3 w-3",
      },
      classes: {
        wrapper: "flex flex-col",
        dropdownWrapper: "relative z-10",
        dropdown:
          "origin-bottom-left absolute bottom-8 rounded shadow bg-linen-200 overflow-hidden mt-1",
        enterClass: "",
        enterActiveClass:
          "transition ease-out duration-100 transform opacity-0 scale-95",
        enterToClass: "transform opacity-100 scale-100",
        leaveClass: "transition ease-in transform opacity-100 scale-100",
        leaveActiveClass: "",
        leaveToClass: "transform opacity-0 scale-95 duration-75",
        inlineWrapper: "",
        inlineViews: "rounded bg-linen-200 border mt-1 inline-flex",
        inputWrapper: "",
        input: "text-black placeholder-gray-400",
        clearButton:
          "rounded transition duration-100 ease-in-out text-gray-600 hover:text-gray-400",
        clearButtonIcon: "",
        viewGroup: "",
        view: "",
        navigator: "pt-2 px-3",
        navigatorViewButton:
          "transition ease-in-out duration-100 inline-flex cursor-pointer rounded-full px-2 py-1 -ml-1 hover:bg-gray-100",
        navigatorViewButtonIcon: "fill-current text-gray-400",
        navigatorViewButtonBackIcon: "fill-current text-gray-400",
        navigatorViewButtonMonth: "text-gray-700 font-semibold",
        navigatorViewButtonYear: "text-gray-500 ml-1",
        navigatorViewButtonYearRange: "text-gray-500 ml-1",
        navigatorLabel: "py-1",
        navigatorLabelMonth: "text-gray-700 font-semibold",
        navigatorLabelYear: "text-gray-500 ml-1",
        navigatorPrevButton:
          "transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-100 rounded-full p-1 ml-2 ml-auto disabled:opacity-50 disabled:cursor-not-allowed",
        navigatorNextButton:
          "transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-100 rounded-full p-1 -mr-1 disabled:opacity-50 disabled:cursor-not-allowed",
        navigatorPrevButtonIcon: "text-gray-400",
        navigatorNextButtonIcon: "text-gray-400",
        calendarWrapper: "px-3 pt-2",
        calendarHeaderWrapper: "",
        calendarHeaderWeekDay:
          "uppercase text-xs text-gray-500 w-8 h-8 flex items-center justify-center",
        calendarDaysWrapper: "",
        calendarDaysDayWrapper: "w-full h-8 flex flex-shrink-0 items-center",
        otherMonthDay:
          "text-sm rounded-full w-8 h-8 mx-auto hover:bg-indigo-400-100 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed",
        emptyDay: "",
        inRangeFirstDay:
          "text-sm bg-indigo-500 text-white w-full h-8 rounded-l-full",
        inRangeLastDay:
          "text-sm bg-indigo-500 text-white w-full h-8 rounded-r-full",
        inRangeDay:
          "text-sm bg-indigo-400-200 w-full h-8 disabled:opacity-50 disabled:cursor-not-allowed",
        selectedDay:
          "text-sm rounded-full w-8 h-8 mx-auto bg-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed",
        activeDay:
          "text-sm rounded-full bg-indigo-400-100 w-8 h-8 mx-auto disabled:opacity-50 disabled:cursor-not-allowed",
        highlightedDay:
          "text-sm rounded-full bg-indigo-400-200 w-8 h-8 mx-auto disabled:opacity-50 disabled:cursor-not-allowed",
        day: "text-sm rounded-full w-8 h-8 mx-auto hover:bg-indigo-400-100 disabled:opacity-50 disabled:cursor-not-allowed",
        today:
          "text-sm rounded-full w-8 h-8 mx-auto hover:bg-indigo-400-100 disabled:opacity-50 disabled:cursor-not-allowed border border-indigo-500",
        monthWrapper: "px-3 pt-2",
        selectedMonth:
          "text-sm rounded w-full h-12 mx-auto bg-indigo-500 text-white",
        activeMonth: "text-sm rounded w-full h-12 mx-auto bg-indigo-400-100",
        month: "text-sm rounded w-full h-12 mx-auto hover:bg-indigo-400-100",
        yearWrapper: "px-3 pt-2",
        year: "text-sm rounded w-full h-12 mx-auto hover:bg-indigo-400-100",
        selectedYear:
          "text-sm rounded w-full h-12 mx-auto bg-indigo-500 text-white",
        activeYear: "text-sm rounded w-full h-12 mx-auto bg-indigo-400-100",
        timepickerWrapper: "flex items-center px-4 py-2 space-x-2",
        timepickerTimeWrapper: "flex items-center space-x-2",
        timepickerTimeFieldsWrapper:
          "bg-linen-100  rounded-md w-full text-right flex items-center border focus:border-blue-500 focus:outline-none",
        timepickerOkButton:
          "text-blue-600 text-sm uppercase font-semibold transition duration-100 ease-in-out border border-transparent focus:border-blue-500focus:outline-none rounded cursor-pointer",
        timepickerInput:
          "text-center w-8 border-transparent bg-transparent p-0 h-6 text-sm transition duration-100 ease-in-out border border-transparent focus:border-blue-500 focus:outline-none rounded",
        timepickerTimeLabel: "flex-grow text-sm text-gray-500",
        timepickerAmPmWrapper:
          "relative inline-flex flex-shrink-0 transition duration-200 ease-in-out bg-white border border-transparent rounded cursor-pointer focus:border-blue-500 focus:outline-none ",
        timepickerAmPmWrapperChecked:
          "relative inline-flex flex-shrink-0 transition duration-200 ease-in-out bg-white border border-transparent rounded cursor-pointer focus:border-blue-500 focus:outline-none ",
        timepickerAmPmWrapperDisabled:
          "relative inline-flex flex-shrink-0 transition duration-200 ease-in-out opacity-50 cursor-not-allowed",
        timepickerAmPmWrapperCheckedDisabled:
          "relative inline-flex flex-shrink-0 transition duration-200 ease-in-out opacity-50 cursor-not-allowed",
        timepickerAmPmButton:
          "absolute flex items-center justify-center w-6 h-6 text-xs text-gray-800 transition duration-200 ease-in-out transform translate-x-0 bg-white rounded shadow",
        timepickerAmPmButtonChecked:
          "absolute flex items-center justify-center w-6 h-6 text-xs text-gray-800 transition duration-200 ease-in-out transform translate-x-full bg-white rounded shadow",
        timepickerAmPmCheckedPlaceholder:
          "flex items-center justify-center w-6 h-6 text-xs text-gray-500 rounded-sm",
        timepickerAmPmUncheckedPlaceholder:
          "flex items-center justify-center w-6 h-6 text-xs text-gray-500 rounded-sm",
      },
    },
  },
  "t-title": {
    component: TTag,
    props: {
      "tag-name": "h1",
      classes: "text-2xl leading-8 font-semibold  tracking-tight mb-2",
      variants: {
        large: "text-3xl leading-8 font-semibold  tracking-tight mb-3",
      },
    },
  },
  "t-subtitle": {
    component: TTag,
    props: {
      "tag-name": "h2",
      classes: "text-lg leading-6 font-semibold  mb-2",
      variants: {
        large: "text-lg leading-6 font-normal  mb-2",
      },
    },
  },
  "t-badge": {
    component: TTag,
    props: {
      "tag-name": "span",
      classes:
        "h-fit-content inline-flex items-center px-3 rounded-full text-xs leading-4 bg-linen-300 text-gray-800",
    },
  },
  "t-avatar": {
    component: TTag,
    props: {
      "tag-name": "div",
      classes:
        "inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500 overflow-hidden leading-none text-center",
    },
  },
  "t-toggle": {
    component: TToggle,
    props: {
      fixedClasses: {
        wrapper:
          "relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200",
        wrapperChecked:
          "relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 border-2 border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-opacity-50",
        wrapperDisabled:
          "relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed",
        wrapperCheckedDisabled:
          "relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed border-2 border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-opacity-50",
        button:
          "inline-block absolute transform translate-x-0 transition ease-in-out duration-200",
        buttonChecked:
          "inline-block absolute transform translate-x-full transition ease-in-out duration-200",
        checkedPlaceholder: "inline-block",
        uncheckedPlaceholder: "inline-block",
      },
      classes: {
        wrapper:
          "bg-gray-500 rounded-full border-2 border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-opacity-50 h-4 items-center",
        wrapperChecked: "bg-indigo-500 rounded-full h-4 items-center",
        wrapperDisabled:
          "bg-gray-500 rounded-full border-2 border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-opacity-50 h-4 items-center",
        wrapperCheckedDisabled: "bg-indigo-500 h-4 items-center",
        button:
          "h-5 w-5 rounded-full bg-white shadow flex items-center justify-center text-gray-400 text-xs",
        buttonChecked:
          "h-5 w-5 rounded-full bg-white shadow flex items-center justify-center text-indigo-500 text-xs",
        checkedPlaceholder:
          "rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs",
        uncheckedPlaceholder:
          "rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs",
      },
    },
  },
  "t-alert": {
    component: TAlert,
    props: {
      fixedClasses: {
        wrapper: "relative flex items-center p-4 border-l-4  rounded shadow-sm",
        body: "flex-grow",
        close:
          "absolute relative flex items-center justify-center ml-4 flex-shrink-0 w-6 h-6 transition duration-100 ease-in-out rounded  focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-opacity-50",
        closeIcon: "fill-current h-4 w-4",
      },
      classes: {
        wrapper: "bg-indigo-400-50 border-indigo-500",
        body: "text-indigo-400-700",
        close: "text-indigo-500 hover:bg-indigo-400-200",
      },
      variants: {
        danger: {
          wrapper: "bg-red-50 border-red-500",
          body: "text-red-700",
          close: "text-red-500 hover:bg-red-200",
        },
        success: {
          wrapper: "bg-green-50 border-green-500",
          body: "text-green-700",
          close: "text-green-500 hover:bg-green-200",
        },
      },
    },
  },
  "t-modal": {
    component: TModal,
    props: {
      fixedClasses: {
        overlay:
          "z-40 overflow-auto scrolling-touch left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-opacity-50",
        wrapper: "relative mx-auto z-50 max-w-lg px-3 py-12",
        modal: "overflow-visible relative  rounded",
        body: "p-3",
        header: "border-b p-3 rounded-t",
        footer: " p-3 rounded-b",
        close:
          "flex items-center justify-center rounded-full absolute right-0 top-0 -m-3 h-8 w-8 transition duration-100 ease-in-out focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-opacity-50",
      },
      classes: {
        overlay: "bg-black",
        wrapper: "",
        modal: "bg-gray-600 shadow",
        body: "p-3",
        header: "border-gray-100",
        footer: "bg-gray-100",
        close: "bg-gray-100 text-gray-600 hover:bg-gray-200",
        closeIcon: "fill-current h-4 w-4",
        overlayEnterClass: "",
        overlayEnterActiveClass: "opacity-0 transition ease-out duration-100",
        overlayEnterToClass: "opacity-100",
        overlayLeaveClass: "transition ease-in opacity-100",
        overlayLeaveActiveClass: "",
        overlayLeaveToClass: "opacity-0 duration-75",
        enterClass: "",
        enterActiveClass: "",
        enterToClass: "",
        leaveClass: "",
        leaveActiveClass: "",
        leaveToClass: "",
      },
    },
  },
  "t-dialog": {
    component: TDialog,
    props: {
      fixedClasses: {
        overlay:
          "overflow-auto scrolling-touch left-0 top-0 bottom-0 right-0 w-full h-full fixed z-40 bg-opacity-50",
        wrapper: "relative mx-auto",
        modal: "overflow-visible relative ",
        close:
          "flex items-center justify-center  rounded-full absolute right-0 top-0 -m-3 h-8 w-8 transition duration-100 ease-in-out focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-opacity-50",
        dialog: "overflow-visible relative",
        iconWrapper:
          "flex flex-shrink-0 h-12 items-center justify-center rounded-full w-12 mx-auto",
        icon: "w-6 h-6",
        okButton:
          "block px-4 py-2 text-white transition duration-100 ease-in-out border border-transparent rounded shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-xs",
        buttons: "p-3 flex space-x-4 justify-center bg-gray-100 rounded-b",
      },
      classes: {
        close: "bg-gray-100 text-gray-600 hover:bg-gray-200",
        closeIcon: "fill-current h-4 w-4",
        overlay: "bg-black",
        wrapper: "z-50 max-w-lg px-3 py-12",
        dialog: "bg-white shadow rounded text-left",
        body: "p-3 space-y-3",
        buttons: "bg-gray-100",
        iconWrapper: "bg-gray-100",
        icon: "text-gray-500",
        content: "w-full flex justify-center flex-col",
        titleWrapper: "",
        title: "text-lg font-semibold text-center",
        textWrapper: "text-left w-full",
        text: "",
        cancelButton:
          "block px-4 py-2 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100 focus:border-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-xs",
        okButton: "bg-indigo-500 hover:bg-indigo-400-600",
        inputWrapper: "mt-3 flex items-center space-x-3",
        input:
          "block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed w-full",
        select:
          "block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-opacity-50  disabled:opacity-50 disabled:cursor-not-allowed w-full",
        radioWrapper: "flex items-center space-x-2",
        radio:
          "text-indigo-500 transition duration-100 ease-in-out border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0  disabled:opacity-50 disabled:cursor-not-allowed",
        radioText: "",
        checkboxWrapper: "flex items-center space-x-2",
        checkbox:
          "text-indigo-500 transition duration-100 ease-in-out border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0  disabled:opacity-50 disabled:cursor-not-allowed",
        checkboxText: "",
        errorMessage: "text-red-500 block text-sm",
        busyWrapper:
          "absolute bg-opacity-50 bg-white flex h-full items-center justify-center left-0 top-0 w-full",
        busyIcon: "animate-spin h-6 w-6 fill-current text-gray-500",
        overlayEnterClass: "",
        overlayEnterActiveClass: "opacity-0 transition ease-out duration-100",
        overlayEnterToClass: "opacity-100",
        overlayLeaveClass: "transition ease-in opacity-100",
        overlayLeaveActiveClass: "",
        overlayLeaveToClass: "opacity-0 duration-75",
        enterClass: "",
        enterActiveClass: "",
        enterToClass: "",
        leaveClass: "",
        leaveActiveClass: "",
        leaveToClass: "",
      },
      variants: {
        danger: {
          okButton: "bg-red-500 hover:bg-red-600",
          iconWrapper: "bg-red-50",
          icon: "text-red-500",
        },
        horizontal: {
          body: "p-3 flex space-x-3",
          title: "text-lg font-semibold",
        },
      },
    },
  },
  "t-dropdown": {
    component: TDropdown,
    props: {
      fixedClasses: {
        button:
          "flex items-center block px-4 py-1 transition duration-100 ease-in-out rounded shadow-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
        wrapper: "inline-flex flex-col",
        dropdownWrapper: "relative z-10",
        enterActiveClass:
          "transition ease-out duration-100 transform opacity-0 scale-95",
        enterToClass: "transform opacity-100 scale-100",
        leaveClass: "transition ease-in transform opacity-100 scale-100",
        leaveToClass: "transform opacity-0 scale-95 duration-75",
      },
      classes: {
        button: "bg-gray-200 hover:bg-gray-200",
        dropdown:
          "bg-white origin-top-left absolute left-0 rounded shadow mt-1",
      },
      variants: {
        left: {
          button: "bg-gray-200 hover:bg-gray-200",
          dropdown:
            "bg-white origin-top-right absolute right-0 rounded shadow mt-1",
        },
        center: {
          button: "bg-gray-200 hover:bg-gray-200",
          dropdown:
            "bg-white origin-top-right absolute top-0 rounded shadow mt-1 transform -translate-x-1/2",
        },
      },
    },
  },
};

Vue.use(VueTailwind, settings);
