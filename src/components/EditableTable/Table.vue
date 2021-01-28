<template>
  <el-row>
    <el-col>
      <el-table
        v-if="errorsCounter.value < 5"
        id="currency-table"
        :data="tableData"
        border
        v-loading="loading"
        style="width: 100%"
        @cell-mouse-enter="handleOnMouseOver"
        @cell-mouse-leave="handleOnMouseLeave"
      >
        <el-table-column label="Currency">
          <template slot-scope="scope">
            <div class="d-flex align-items-center h-stretch">
              <span>{{ scope.row.ccy }}/{{ scope.row.base_ccy }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Buy" prop="buy" align="center">
          <template slot-scope="scope">
            <EditableCell
              fieldName="buy"
              :validator="validator"
              :row-buffer="rowBuffer"
              :scope="scope"
              :hovered-row="hoveredRow"
              :editable-row="editableRow"
              :handleOnEditIconClick="handleOnEditIconClick"
              :isEditMode="isEditMode"
              :isEditIconVisible="isEditIconVisible"
              :handleSaveCellValue="handleSaveCellValue"
              :saveCellValueIconClass="saveCellValueIconClass"
              :handleCancelCellEditing="handleCancelCellEditing"
              :cancelCellEditingClass="cancelCellEditingClass"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="sale" label="Sale">
          <template slot-scope="scope">
            <EditableCell
              fieldName="sale"
              :validator="validator"
              :row-buffer="rowBuffer"
              :scope="scope"
              :hovered-row="hoveredRow"
              :editable-row="editableRow"
              :handleOnEditIconClick="handleOnEditIconClick"
              :isEditMode="isEditMode"
              :isEditIconVisible="isEditIconVisible"
              :handleSaveCellValue="handleSaveCellValue"
              :saveCellValueIconClass="saveCellValueIconClass"
              :handleCancelCellEditing="handleCancelCellEditing"
              :cancelCellEditingClass="cancelCellEditingClass"
            />
          </template>
        </el-table-column>
      </el-table>
      <el-alert
        v-else
        title="Server Error"
        type="error"
        :description="'errors counter: ' + errorsCounter.value"
        show-icon
      >
      </el-alert>
    </el-col>
  </el-row>
</template>

<script>
import EditableCell from "./EditableCell.vue";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

const mapLabelsToProps = {
  Buy: "buy",
  Sale: "sale"
};

export default {
  name: "EditableTable",
  components: {
    EditableCell
  },
  data: () => ({
    loading: true,
    errorsCounter: { value: 0 },
    validator: {
      isValid: true,
      hint: ""
    },
    hoveredRow: {},
    editableRow: null,
    rowBuffer: null,
    columnName: null,
    cellId: "",
    tableData: []
  }),
  computed: {
    ...mapGetters({
      getCurrencies: "converter/getCurrencies",
      getCurrencyOptions: "converter/getCurrencyOptions"
    }),
    saveCellValueIconClass() {
      return {
        "el-icon-check el-input__icon pointer-icon": true,
        pointer: this.validator.isValid,
        "pointer-not-allowed": !this.validator.isValid
      };
    },
    cancelCellEditingClass() {
      return {
        "el-icon-close el-input__icon pointer-icon": true,
        pointer: this.validator.isValid
      };
    }
  },
  methods: {
    ...mapActions("converter", ["setCurrencies", "setCurrencyOptions"]),
    isEditIconVisible(scope, columnName) {
      return (
        this.hoveredRow &&
        !this.editableRow &&
        this.columnName === columnName &&
        this.hoveredRow.ccy + this.hoveredRow.base_ccy ===
          scope.row.ccy + scope.row.base_ccy
      );
    },
    isEditMode(scope, columnName) {
      return (
        this.editableRow &&
        this.columnName === columnName &&
        this.editableRow.ccy + this.hoveredRow.base_ccy ===
          scope.row.ccy + scope.row.base_ccy
      );
    },
    handleOnMouseOver(row, column) {
      this.cellId = column.id + "_" + row.ccy + row.base_ccy;
      if (!this.editableRow) {
        this.columnName = mapLabelsToProps[column.label];
        this.hoveredRow = row;
      }
    },
    handleOnMouseLeave() {
      if (!this.editableRow) {
        this.hoveredRow = {};
        this.columnName = null;
      }
    },
    handleOnEditIconClick(row) {
      this.editableRow = row;
      this.rowBuffer = { ...row };
      this.clearErrors();
    },
    handleSaveCellValue() {
      if (this.validate()) return;
      const a = this.rowBuffer ? this.rowBuffer[this.columnName] : null;
      this.$set(this.editableRow, this.columnName, a);
      this.editableRow = null;
      this.clearErrors();
    },
    handleCancelCellEditing() {
      this.editableRow = null;
      this.clearErrors();
    },
    validate() {
      this.clearErrors();
      if (!this.rowBuffer) return;
      const a = this.editableRow
        ? this.editableRow.origin[this.columnName]
        : null;
      const per = (a * 10) / 100;
      const diff = Math.abs(this.rowBuffer[this.columnName] - a);
      const errors = diff > per;
      if (errors) {
        const min = parseFloat(a) - parseFloat(per);
        const max = parseFloat(a) + parseFloat(per);
        this.$set(this.validator, "isValid", false);
        this.$set(
          this.validator,
          "hint",
          "Values allowed: min: " + min.toFixed(4) + ", max: " + max.toFixed(4)
        );
      }
      return errors;
    },
    clearErrors() {
      this.$set(this.validator, "isValid", true);
      this.$set(this.validator, "hint", "");
    },
    setErrorsCounter(value) {
      localStorage.setItem("errors_counter", JSON.stringify({ value: value }));
    },
    getErrorCounter() {
      this.errorsCounter = localStorage.getItem("errors_counter");
      this.errorsCounter = JSON.parse(this.errorsCounter);
    },
    checkErrorCounter() {
      this.getErrorCounter();
      if (!this.errorsCounter) {
        this.setErrorsCounter(0);
        this.getErrorCounter();
      } else if (this.errorsCounter.value < 5) {
        this.errorsCounter.value++;
        this.setErrorsCounter(this.errorsCounter.value);
      } else {
        this.setErrorsCounter(0);
        this.getErrorCounter();
      }
    }
  },
  mounted() {
    axios
      .get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
      .then(res => {
        let options = [];
        this.tableData = res.data.map(o => {
          if (!options.includes(o.base_ccy)) options.push(o.base_ccy);
          if (!options.includes(o.ccy)) options.push(o.ccy);
          return { ...o, origin: o };
        });
        this.setCurrencies(this.tableData);
        this.loading = false;
        options = options.map(o => {
          return {
            value: o,
            label: o,
            disabled: false
          };
        });
      });
    this.checkErrorCounter();
  },
  watch: {
    rowBuffer: {
      handler() {
        this.validate();
      },
      deep: true
    }
  }
};
</script>

<style lang="scss">
.el-table td {
  padding: 0 !important;
  .cell {
    min-height: 55px;
    height: 55px;
    .el-row {
      height: 100%;
    }
  }
}
</style>
