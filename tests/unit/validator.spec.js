import { expect } from "chai";
import { mount, createLocalVue } from "@vue/test-utils";
import Table from "@/components/EditableTable/Table.vue";
import { DATA_TABLE_ROW } from "../data";
import ElementUI from 'element-ui'

const localVue = createLocalVue()

localVue.use(ElementUI)

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

  const makeWrapper = (props = null) => {
    return mount(Table, {
      localVue,
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
      }
    })
   }

  it("passes if the buy field less than 10% the origin.buy", () => {
    let wrapper = makeWrapper();
    expect(wrapper.vm.validate()).to.equal(true);
  });
});
