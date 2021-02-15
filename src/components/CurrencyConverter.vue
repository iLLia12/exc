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
          class="swap-button-wrap mt15 d-flex justify-center"
          :xs="{ span: 24, offset: 0 }"
          :sm="{ span: 4, offset: 0 }"
          :md="{ span: 4, offset: 0 }"
          :lg="{ span: 4, offset: 0 }"
          :xl="{ span: 4, offset: 0 }"
        >
          <el-button class="swap-button" type="primary" size="mini" round @click="swap()">
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
import Converter from "../services/converter";

export const CONVERTER = {
  valueToChange: "",
  valueToGet: "",
  currencyToChange: "",
  currencyToGet: ""
};

export default {
  name: "CurrencyConverter",
  data: () => ({
    converter: CONVERTER,
    buffer: CONVERTER,
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
      this.converter.valueToGet = new Converter(
        this.getCurrencies,
        this.converter.currencyToChange,
        this.converter.currencyToGet,
        this.converter.valueToChange
      ).get();
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
  .swap-button-wrap {
    margin: 20px 0 0 0;
  }
  .swap-button-img {
    transform: rotate(90deg);
  }
  .calculate-btn {
    width: 100%;
  }
  .currency-converter {
    padding-top: 20px;
  }
}
</style>
