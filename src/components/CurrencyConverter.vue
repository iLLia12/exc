<template>
  <el-row class="currency-converter">
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
              v-for="item in options"
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
            disabled
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
              v-for="item in options"
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
    bufferConverter: {
      valueToChange: "",
      valueToGet: "",
      currencyToChange: "",
      currencyToGet: ""
    },
    options: [
      {
        value: "USD",
        label: "USD",
        disabled: false
      },
      {
        value: "EUR",
        label: "EUR",
        disabled: false
      },
      {
        value: "UAH",
        label: "UAH",
        disabled: false
      },
      {
        value: "BTC",
        label: "BTC",
        disabled: false
      }
    ],
    isExchangeDisabled: false
  }),
  computed: {
    ...mapGetters({
      getCurrencies: "converter/getCurrencies"
    })
  },
  methods: {
    swap() {
      this.bufferConverter = { ...this.converter };
      this.converter.valueToChange = this.bufferConverter.valueToGet;
      this.converter.valueToGet = this.bufferConverter.valueToChange;
      this.converter.currencyToChange = this.bufferConverter.currencyToGet;
      this.converter.currencyToGet = this.bufferConverter.currencyToChange;
      this.bufferConverter = {};
    }
  },
  watch: {
    converter: {
      handler(value) {
        const currencies = this.getCurrencies;
        const currency1 = value.currencyToChange;
        const currency2 = value.currencyToGet;
        this.options.forEach((part, index, theArray) => {
          theArray[index]["disabled"] =
            theArray[index]["value"] === currency1 ||
            theArray[index]["value"] === currency2;
        });
        currencies.forEach((part, index, theArray) => {
          this.isExchangeDisabled =
            theArray[index]["ccy"] === currency1 &&
            theArray[index]["base_ccy"] !== currency2;
        });
      }
    }
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
}
</style>
