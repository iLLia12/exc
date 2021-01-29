import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Table from "@/components/EditableTable/Table.vue";

global.localStorage = {
  errors_counter: JSON.stringify({ value: 1 }),
  getItem: function(e) {
    return this[e];
  },
  setItem: function(e) {
    return { errors_counter: JSON.stringify({ value: 1 }), test: e };
  }
};
let obj = {
  base_ccy: "UAH",
  buy: "21.95000",
  ccy: "USD",
  origin: {
    base_ccy: "UAH",
    buy: "27.95000",
    ccy: "USD",
    sale: "28.35000"
  },
  sale: "28.35000"
};

describe("Table.vue", () => {
  it("passes if the buy field less than 10% the origin.buy", () => {
    const wrapper = mount(Table, {
      data() {
        return {
          editableRow: obj,
          rowBuffer: obj,
          columnName: "buy",
          validator: { hing: "", isValid: true }
        };
      },
      directives: {
        loading: true
      },
      stubs: {
        "el-table-column": true,
        "el-col": true,
        "el-row": true,
        "el-table": true
      }
    });

    expect(wrapper.vm.validate()).to.equal(true);
  });
});
