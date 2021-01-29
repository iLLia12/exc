<template>
  <el-row class="currency-converter">
    <el-col>
      <el-row>
        <el-col
          :xs="{ span: 24, offset: 0 }"
          :sm="{ span: 10, offset: 0 }"
          :md="{ span: 10, offset: 0 }"
          :lg="{ span: 10, offset: 0 }"
          :xl="{ span: 10, offset: 0 }"
        >
          <div class="d-flex">
            <div class="w-stretch">
              <div class="text-align-left fs14">Change</div>
              <el-input
                :disabled="isExchangeDisabled"
                type="number"
                placeholder="Please input"
                v-model="converter.valueToChange"
              ></el-input>
            </div>
            <div class="pl20 pt16">
              <el-select
                v-model="converter.currencyToChange"
                placeholder="Select"
                value-key="value"
              >
                <el-option
                  v-for="item in getCurrencyOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col
          class="swap-button mt15 d-flex justify-center"
          :xs="{ span: 24, offset: 0 }"
          :sm="{ span: 4, offset: 0 }"
          :md="{ span: 4, offset: 0 }"
          :lg="{ span: 4, offset: 0 }"
          :xl="{ span: 4, offset: 0 }"
        >
          <el-button type="primary" size="mini" round @click="swap()">
            <img
              src="../assets/images/exchange.png"
              alt=""
              class="swap-button-img"
            />
          </el-button>
        </el-col>
        <el-col
          :xs="{ span: 24, offset: 0 }"
          :sm="{ span: 10, offset: 0 }"
          :md="{ span: 10, offset: 0 }"
          :lg="{ span: 10, offset: 0 }"
          :xl="{ span: 10, offset: 0 }"
        >
          <div class="d-flex">
            <div class="w-stretch">
              <div class="text-align-left fs14">Get</div>
              <el-input
                type="number"
                placeholder="Please input"
                v-model="converter.valueToGet"
              ></el-input>
            </div>
            <div class="pl20 pt16">
              <el-select
                v-model="converter.currencyToGet"
                placeholder="Select"
                value-key="value"
              >
                <el-option
                  v-for="item in getCurrencyOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col class="pt16">
      <el-button class="calculate-btn" type="success" plain @click="calculate()"
        >Calculate</el-button
      >
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CurrencyConverter",
  data: () => ({
    converter: {
      valueToChange: "",
      valueToGet: "",
      currencyToChange: "",
      currencyToGet: ""
    },
    buffer: {
      valueToChange: "",
      valueToGet: "",
      currencyToChange: "",
      currencyToGet: ""
    },
    options: [],
    isExchangeDisabled: false
  }),
  computed: {
    ...mapGetters({
      getCurrencies: "converter/getCurrencies",
      getCurrencyOptions: "converter/getCurrencyOptions"
    })
  },
  methods: {
    swap() {
      this.buffer = { ...this.converter };
      this.converter.valueToChange = this.buffer.valueToGet;
      this.converter.valueToGet = this.buffer.valueToChange;
      this.converter.currencyToChange = this.buffer.currencyToGet;
      this.converter.currencyToGet = this.buffer.currencyToChange;
      this.buffer = {};
      this.calculate();
    },
    calculate() {
      let currencies = this.getCurrencies;
      const currency1 = this.converter.currencyToChange;
      const currency2 = this.converter.currencyToGet;

      /**
       * One to one
       **/
      currencies.every(o => {
        if (o["base_ccy"] === currency1 && o["ccy"] === currency2) {
          this.converter.valueToGet =
            this.converter.valueToChange / parseFloat(o["sale"]);
          return false;
        }
        if (o["base_ccy"] === currency2 && o["ccy"] === currency1) {
          this.converter.valueToGet =
            this.converter.valueToChange * parseFloat(o["buy"]);
          return false;
        }
        return true;
      });

      /**
       * Through pivot currencies
       **/
      //UAH to BTC
      if (currency1 === "UAH" && currency2 === "BTC") {
        let found = currencies.find(
          element => element["ccy"] === "USD" && element["base_ccy"] === "UAH"
        );
        let a = this.converter.valueToChange / parseFloat(found["sale"]);
        found = currencies.find(
          element => element["ccy"] === "BTC" && element["base_ccy"] === "USD"
        );
        this.converter.valueToGet = a / parseFloat(found["sale"]);
      }
      //BTC to UAH
      if (currency1 === "BTC" && currency2 === "UAH") {
        let found = currencies.find(
          element => element["ccy"] === "BTC" && element["base_ccy"] === "USD"
        );
        let a = this.converter.valueToChange * parseFloat(found["buy"]);
        found = currencies.find(
          element => element["ccy"] === "USD" && element["base_ccy"] === "UAH"
        );
        this.converter.valueToGet = a * parseFloat(found["buy"]);
      }
      //BTC to EUR
      if (currency1 === "BTC" && currency2 === "EUR") {
        let found = currencies.find(
          element => element["ccy"] === "BTC" && element["base_ccy"] === "USD"
        );
        let a = this.converter.valueToChange * parseFloat(found["buy"]);
        found = currencies.find(
          element => element["ccy"] === "USD" && element["base_ccy"] === "UAH"
        );
        a = a * parseFloat(found["buy"]);
        found = currencies.find(
          element => element["ccy"] === "EUR" && element["base_ccy"] === "UAH"
        );
        this.converter.valueToGet = a / parseFloat(found["sale"]);
      }
      //EUR to BTC
      if (currency1 === "EUR" && currency2 === "BTC") {
        let found = currencies.find(
          element => element["ccy"] === "EUR" && element["base_ccy"] === "UAH"
        );
        let a = this.converter.valueToChange * parseFloat(found["buy"]);
        found = currencies.find(
          element => element["ccy"] === "USD" && element["base_ccy"] === "UAH"
        );
        a = a / parseFloat(found["sale"]);
        found = currencies.find(
          element => element["ccy"] === "BTC" && element["base_ccy"] === "USD"
        );
        this.converter.valueToGet = a / parseFloat(found["sale"]);
      }
      //USD to EUR
      if (currency1 === "USD" && currency2 === "EUR") {
        let found = currencies.find(
          element => element["ccy"] === "USD" && element["base_ccy"] === "UAH"
        );
        let a = this.converter.valueToChange * parseFloat(found["buy"]);
        found = currencies.find(
          element => element["ccy"] === "EUR" && element["base_ccy"] === "UAH"
        );
        this.converter.valueToGet = a / parseFloat(found["sale"]);
      }
      //EUR to USD
      if (currency1 === "EUR" && currency2 === "USD") {
        let found = currencies.find(
          element => element["ccy"] === "EUR" && element["base_ccy"] === "UAH"
        );
        let a = this.converter.valueToChange * parseFloat(found["buy"]);
        found = currencies.find(
          element => element["ccy"] === "USD" && element["base_ccy"] === "UAH"
        );
        this.converter.valueToGet = a / parseFloat(found["sale"]);
      }
    }
  },
  watch: {
    converter: {
      handler(value) {
        const currency1 = value.currencyToChange;
        const currency2 = value.currencyToGet;
        this.options.forEach((part, index, theArray) => {
          theArray[index]["disabled"] =
            theArray[index]["value"] === currency1 ||
            theArray[index]["value"] === currency2;
        });
        if (
          !!value.currencyToChange.length &&
          !!value.valueToChange.length &&
          !!value.currencyToGet.length
        )
          this.calculate();
      },
      deep: true
    }
  },
  created() {
    this.options = this.getCurrencyOptions;
  }
};
</script>

<style lang="scss">
.currency-converter {
  padding-top: 50px;
}
@media (max-width: 767px) {
  .swap-button {
    margin: 20px 0 0 0;
  }
  .swap-button-img {
    transform: rotate(90deg);
  }
  .calculate-btn {
    width: 100%;
  }
}
</style>
