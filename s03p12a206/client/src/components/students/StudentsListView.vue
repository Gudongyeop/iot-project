<template>
 
    <v-data-table

      :headers="headers"
      :items="displayStudents"
      :single-select="singleSelect"
      item-key="id"
      :page.sync="page"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon style="color: #0f4c81"
              v-bind="attrs" v-on="on"
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>수정</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon style="color: #9b1b30"
              v-bind="attrs" v-on="on"
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>삭제</span>
        </v-tooltip>
        
      </template>
    </v-data-table>
   <!-- </div> -->
</template>

<script>
export default {
  name: 'StudentsListView',
  props: {displayStudents: {type: Array}, search: {type: String}},
  data() {
    return {
      page: 1,
      selected: [],
      //서치삭제
      singleSelect: false,
      headers: [
        { text: '이름', value: 'name' },
        { text: '지역', value: 'area' },
        { text: '기수', value: 'gisu'},
        { text: '반', value: 'stu_class' },
        { text: '시리얼번호', value: 'serial'},
        { text: '수정/삭제', value: 'actions', sortable: false },
      ],
    }
  },
  methods: {
    editItem(stu) {
      const no = stu.no
      this.$router.push(`/students/${no}`)      
    },
    deleteItem(stu) {      
      this.$emit('delete', stu)
    }
  },
  watch: {
    displayStudents: {
      deep: true,
      handler() {
        this.page = 1
      }
    }
  }
}
</script>

<style>

</style>