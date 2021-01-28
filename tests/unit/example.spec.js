import { mount } from "@vue/test-utils";
import Table from "@/components/EditableTable/Table.vue";

global.localStorage = {
  errors_counter: { value: 1 },
  getItem: function(e) {
    return this[e];
  },
  setItem: function(e) {
    return { errors_counter: { value: 1 }, test: e };
  }
};

describe("Table", () => {
  it("displays 'Emitted!' when custom event is emitted", () => {
    const anotherMethodMock = jest.fn();

    let editableRow = {
      base_ccy: "UAH",
      buy: "27.95000",
      ccy: "USD",
      origin: {
        base_ccy: "UAH",
        buy: "27.95000",
        ccy: "USD",
        sale: "28.35000"
      },
      sale: "28.35000"
    };

    let rowBuffer = { ...editableRow };

    const wrapper = mount(Table);
    wrapper.setData({
      rowBuffer: rowBuffer,
      editableRow: editableRow,
      columnName: "buy",
      validator: {
        isValid: false,
        hint: ""
      }
    });
    wrapper.setMethods({
      getErrorCounter: anotherMethodMock,
      checkErrorCounter: anotherMethodMock
    });

    expect(wrapper.vm.validate()).toBe(false);
  });
});
