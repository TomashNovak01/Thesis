<template>
  <div>
    <btn @click="show = true">Добавить поле</btn>
    <div v-if="show" class="dialog" @click.self="show = false">
      <div class="dialog_body">
        <div class="dialog_body_header">
          <h2>Добавление полей в полевой акт</h2>
          <btn @click="addFields">Добавить</btn>
        </div>
        <template v-for="(field, index) of fields">
          <div v-if="field" :key="'field_' + index" class="fieldList">
            <div class="field">
              <input v-if="!data.find((f) => f.id_code === field.id_code)" type="checkbox" :id="'field:' + index"
                :checked="!!newFields.find((f) => f.id_code === field.id_code)">
              <input v-else type="checkbox" :id="'field:' + index" checked="true" disabled="true">
              <label for="'field:' + index">{{ field.value_full }}</label>
            </div>
          </div>
          <hr v-if="field.block_id !== (fields[index + 1] || { block_id: field.block_id }).block_id"
            :key="'divider_' + index" class="divider" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import fields from "../../../files/fields.json"

export default {
  name: "DialogFields",
  props: {
    data: {
      type: Object,
      require: true
    },
    research: {
      type: Number,
      require: true
    }
  },
  setup(props, { emit }) {
    const show = ref(false);

    const newFields = ref([]);

    const toggle = (field) => {
      const index = newFields.value.findIndex((f) => f.id_code === field.id_code);

      if (index === -1) newFields.value.push(field);
      else newFields.value.splice(index, 1);

      newFields.value.sort((a, b) => a.sequence - b.sequence);
    }

    const addFields = () => {
      for (let i = 0; i < newFields.value.length; i++) {
        props.data.push({
          id: newFields.value.length + 1,
          id_code: newFields.value[i].id_code,
          research_id: props.research,
          title: newFields.value[i].value_full,
          unit: newFields.value[i].unit,
          mb_before_fracturing: 0,
          mb_after_fracturing: 0,
          mb_frac: 0,
          design: 0,
          redesign: 0,
          fact: 0,
          to_pay: 0,
          sequence: newFields.value[i].sequence,
          block_id: newFields.value[i].block_id,
          is_editable: 1,
          is_title_editable: 0,
        });
      }

      props.data.sort((a, b) => a.sequence - b.sequence);
      newFields.value = [];

      show.value = false;
    }

    return {
      show,
      fields,
      newFields,
      toggle,
      addFields
    }
  }
}
</script>

<style lang="scss">
.dialog {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  overflow: auto;
  z-index: 5000;

  &_body {
    width: 1000px;
    z-index: 9999;
    margin: auto;
    background: white;
    padding: 10px;
    border-radius: 15px;
    box-shadow: 0 0 10px gray;

    .divider {
      margin-top: 10px;
      margin-bottom: 10px;
    }

    &_header {
      display: flex;
      justify-content: space-between;
    }

    .fieldList {
      .field {
        align-items: center;
        display: flex;
        flex: 1 1 100%;
        letter-spacing: normal;
        min-height: 30px;
        outline: none;
        padding: 0 16px;
        position: relative;
        text-decoration: none;

        input {
          margin-right: 10px;
          transform: scale(1.3);
          opacity: .9;
          cursor: pointer;
        }

        label {
          font-size: 12pt;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>