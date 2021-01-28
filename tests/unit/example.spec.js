import { mount } from "@vue/test-utils";
import Table from "@/components/EditableTable/Table.vue";

describe("ParentComponent", () => {
  it("displays 'Emitted!' when custom event is emitted", () => {
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

    // expect(wrapper.vm.validate()).toBe(false);
  });
});
