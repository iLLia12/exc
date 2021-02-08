import { expect } from "chai";
import { mount } from "@vue/test-utils";
import CurrencyConverter from "@/components/CurrencyConverter.vue";
import store from "@/store";
import { CURRENCIES_RATE, CONVERTER } from "../data";

describe("CurrencyConverter.vue", () => {
  it("converters UAH to BTC successfully", () => {
    const wrapper = mount(CurrencyConverter, {
      store,
      data() {
        return {
          converter: CONVERTER
        };
      },
      computed: {
        getCurrencies() {
          return CURRENCIES_RATE;
        }
      },
      stubs: {
        "el-table-column": true,
        "el-col": true,
        "el-row": true,
        "el-table": true,
        "el-input": true,
        "el-select": true,
        "el-button": true,
        "el-option": true
      }
    });
    wrapper.vm.calculate();
    expect(wrapper.vm.converter.valueToGet.toFixed(2)).to.equal("1.04");
  });
});
