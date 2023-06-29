<template>
  <div>
    <div class="d-flex ma-0 pa-0 align-end justify-space-between">
      <h3 class="text-left mb-0 d-inline-block">코로나 뉴스</h3>
      <p class="mb-0 d-inline-block" style="font-size: 1vh" v-if="lastUpdate[0]"><b>최근 업데이트:</b> {{ lastUpdate[0].last_build | moment('YYYY.MM.DD HH:mm') }}</p>       
    </div>
    <hr style="border: 1px solid black;" >

    <v-card  style="box-shadow: none;">
      <v-data-table
        :headers="headers"
        :items="coronaArticles"
        :items-per-page=10
      >
      <template v-slot:item={item}>
        <tr>
          <v-tooltip v-if="windowWidth >= 960" top :open-delay="250">
            <template v-slot:activator="{ on, attrs }">
              <td class="truncate text-left" v-bind="attrs" v-on="on"><a :href="item.originallink" v-html="item.title" class="black--text text-decoration-none" target="_blank">{{item.title}}</a></td>
            </template>
            <span v-html="item.title">{{item.title}}</span>
          </v-tooltip>

          <td class="truncate text-left" v-if="windowWidth < 960"><a :href="item.originallink" v-html="item.title" class="black--text text-decoration-none" target="_blank">{{item.title}}</a></td>
          <td>{{ item.pubDate | moment('YYYY.MM.DD HH:mm') }}</td>
        </tr>
      </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const sessionStore = 'sessionStore'

export default {
    name: 'CoronaNews',
    props: {
        coronaArticles :{type : Array},
        lastUpdate :{type : Array}
    },
    data(){
      return{
        search: '',
        showTooltip: false,
        headers: [
        {
          text: 'Title',
          align: 'left',
          sortable: false,
          value: 'title',
          width: "75%"
        },
        { 
          text: 'Published Date', 
          value: 'pubDate' 
        },
        ],
      }
    },
    methods: {
      resetNews() {
        this.$emit('refresh')
      },
    },
    computed: {
      ...mapGetters(sessionStore, [
        'windowWidth'
      ])
    },
   
}
</script>

<style scoped>
.truncate {
  max-width: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>