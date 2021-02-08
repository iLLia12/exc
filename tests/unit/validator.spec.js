import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Table from "@/components/EditableTable/Table.vue";
import { DATA_TABLE_ROW } from "../data";

global.localStorage = {
  errors_counter: JSON.stringify({ value: 1 }),
  getItem: function(e) {
    return this[e];
  },
  setItem: function(e) {
    return { errors_counter: JSON.stringify({ value: 1 }), test: e };
  }
};

describe("Table.vue", () => {
  it("passes if the buy field less than 10% the origin.buy", () => {
    const wrapper = mount(Table, {
      data() {
        return {
          editableRow: DATA_TABLE_ROW,
          rowBuffer: DATA_TABLE_ROW,
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
