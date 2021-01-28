<template>
  <el-row type="flex" justify="space-between">
    <div class="d-flex align-items-center h-stretch">
      <span>{{ scope.row[fieldName] }}</span>
    </div>
    <div class="d-flex align-items-center">
      <i
        class="el-icon-edit pointer"
        @click="handleOnEditIconClick(scope.row)"
        v-if="isEditIconVisible(scope, fieldName)"
      ></i>
      <el-row v-if="isEditMode(scope, fieldName)">
        <el-input
          type="number"
          size="mini"
          placeholder="Please input"
          v-model="rowBuffer[fieldName]"
          class="mt15"
        >
          <div slot="suffix">
            <el-tooltip
              v-if="!!validator.hint.length"
              class="item"
              effect="dark"
              :content="validator.hint"
              placement="top-start"
            >
              <i
                @click="handleSaveCellValue()"
                style="color: cornflowerblue"
                :class="saveCellValueIconClass"
              ></i>
            </el-tooltip>
            <i
              v-else
              @click="handleSaveCellValue()"
              style="color: cornflowerblue"
              :class="saveCellValueIconClass"
            ></i>
            <i
              @click="handleCancelCellEditing()"
              :class="cancelCellEditingClass"
            ></i>
          </div>
        </el-input>
      </el-row>
    </div>
  </el-row>
</template>

<script>
export default {
  name: "Home",
  props: {
    rowBuffer: {
      type: Object
    },
    scope: {
      type: Object
    },
    handleOnEditIconClick: {
      type: Function
    },
    fieldName: {
      type: String
    },
    isEditIconVisible: {
      type: Function
    },
    isEditMode: {
      type: Function
    },
    handleSaveCellValue: {
      type: Function
    },
    handleCancelCellEditing: {
      type: Function
    },
    saveCellValueIconClass: {
      type: Object
    },
    cancelCellEditingClass: {
      type: Object
    },
    validator: {
      type: Object
    }
  }
};
</script>
