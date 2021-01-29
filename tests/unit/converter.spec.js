import { expect } from "chai";
import { mount } from "@vue/test-utils";
import CurrencyConverter from "@/components/CurrencyConverter.vue";
import store from "@/store";

describe("CurrencyConverter.vue", () => {
  it("converters UAH to BTC successfully", () => {
    const wrapper = mount(CurrencyConverter, {
      store,
      data() {
        return {
          converter: {
            valueToChange: "1000000",
            valueToGet: "", //1.0487014444071623
            currencyToChange: "UAH",
            currencyToGet: "BTC"
          }
        };
      },
      computed: {
        getCurrencies() {
          return [
            {
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
            },
            {
              base_ccy: "UAH",
              buy: "33.80000",
              ccy: "EUR",
              origin: {
                base_ccy: "UAH",
                buy: "33.80000",
                ccy: "EUR",
                sale: "34.40000"
              },
              sale: "34.40000"
            },
            {
              base_ccy: "UAH",
              buy: "0.36500",
              ccy: "RUR",
              origin: {
                base_ccy: "UAH",
                buy: "0.36500",
                ccy: "RUR",
                sale: "0.40000"
              },
              sale: "0.40000"
            },
            {
              base_ccy: "USD",
              buy: "30553.3775",
              ccy: "BTC",
              origin: {
                base_ccy: "USD",
                buy: "30553.3775",
                ccy: "BTC",
                sale: "33769.5225"
              },
              sale: "33769.5225"
            }
          ];
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
    expect(wrapper.vm.converter.valueToGet.toFixed(2)).to.equal('1.04');
  });
});
