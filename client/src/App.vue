<template>
  <v-app id="app">
    <div class="alert" v-if="messageBox">
      <transition name="slide-fade" mode="out-in">
        <v-alert v-if ="messageSuccess" color="#0f4c81" style="color:white;">
        메시지가 전송되었습니다.
        </v-alert>
      </transition>
      <transition name="fade" mode="out-in">
        <v-alert v-if="messageFail" type="error">
          메시지 전송에 실패했습니다.
        </v-alert>
      </transition>
    </div>
      <v-app-bar class="test" dense prominent flat dark color="#FFFFFF" fixed>
        <v-container fluid class="my-auto" >
          <v-row jutify="center" align="center">
            <v-spacer class="d-none d-md-flex"></v-spacer>
            <v-toolbar-title @click="goHome" style="cursor:pointer;">
              <img src="@/assets/logo.png" alt="logo" style="height: 50px" >
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn :ripple="false" text class="navitem d-none d-md-flex text-decoration-none" to="/temperature" >
              <v-col class="text-left text-h5" style="color: black" :class="{ 'font-weight-bold test-2': $route.name =='Temperature' }">체온 확인</v-col>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn :ripple="false" text class="navitem d-none d-md-flex text-decoration-none"  to="/students" >
              <v-col class="text-left text-h5" style="color: black" :class="{ 'font-weight-bold test-2': $route.name =='Students' }" >학생 관리</v-col>
            </v-btn>
          
            <v-spacer></v-spacer>
            <div class="navitem d-none d-md-flex " style="">
              <v-btn :ripple="false" v-if="!isLoggedIn" text class="text-decoration-none" to="/signin" >
                <v-col class="text-left primary--text">로그인</v-col>

              </v-btn>
              <v-btn :ripple="false" v-if="isLoggedIn" text class="text-decoration-none" @click="signout">
                <v-col class="text-left" style="color: #9b1b30">로그아웃</v-col>
              </v-btn>
            </div>

            <v-app-bar-nav-icon @click="drawer = true" class="d-flex d-md-none" color="black"></v-app-bar-nav-icon>
            <v-spacer class="d-none d-md-flex"></v-spacer>
          </v-row>
        </v-container>
      </v-app-bar>
    
      <v-navigation-drawer v-model="drawer" absolute temporary class="navdrawer d-flex d-md-none" right>

      <template v-slot:prepend>
        <router-link to="/signin" class="text-decoration-none black--text" v-if="!isLoggedIn">
          <div class="pa-2 d-flex mt-5">
            <v-avatar color="#000000" size="36">
              <v-icon dark>mdi-shield-account</v-icon>
            </v-avatar>
            <h3 class="align-self-center ml-4">로그인</h3>
          </div>
        </router-link>
          <div class="pa-2 d-flex text-decoration-none black--text mt-5" v-if="isLoggedIn" @click="signout" style="cursor:pointer;">
            <v-avatar color="#000000" size="36">
              <v-icon dark>mdi-shield-account</v-icon>
            </v-avatar>
            <h3 class="align-self-center ml-4">로그아웃</h3>
          </div>
      </template>

     <v-list nav dense>
       <hr class="mt-5">
        <v-list-item-group>
          <v-list-item class="px-3 text-decoration-none" to="/">
            <v-row>
              <v-col cols="2">
                <v-icon color="#000000">mdi-home</v-icon>
              </v-col>
              <v-col class="text-left">홈</v-col>
            </v-row>
            </v-list-item>

            <v-list-item class="px-3 text-decoration-none" to="/temperature">
            <v-row>
              <v-col cols="2">
                <v-icon color="#000000">mdi-thermometer</v-icon>
              </v-col>
              <v-col class="text-left">체온 확인</v-col>
            </v-row>
            </v-list-item>

            <v-list-item class="px-3 text-decoration-none" to="/students">
            <v-row>
              <v-col cols="2">
                <v-icon color="#000000">mdi-account-group</v-icon>
              </v-col>
              <v-col class="text-left">학생 관리</v-col>
            </v-row>
            </v-list-item>
        </v-list-item-group>
      </v-list>
     
    </v-navigation-drawer>
    
    <div class="mainpage">
      <transition name="fade" mode="out-in">
      <router-view 
        style="min-height: 800px; margin-top: 32px; margin-bottom: 70px;"
      />
      </transition>
    </div>
    <footer class="site-footer" >
      <div class="container" style=" max-width: 1300px;">
        <div class="row">
          <div class="col-md-3 d-none d-md-flex">
            <img src="./assets/footerlogo.png" width="100" height="100" alt="footer" >
          </div>
          <div class="col-sm-12 col-md-7" style="text-align: left;">
            <div>
            <span style="cursor:pointer; color: white;" @click.stop="ToU = true">이용약관</span>
            <span> | </span>
            <span style="cursor:pointer; color: #3c90e2; " @click.stop="PP = true">개인정보처리방침</span>
            </div>
            <p style="font-size:12px" class="my-0">SSAFY 3기 A206 서울 강남구 테헤란로 212, 14층(역삼동, 멀티캠퍼스)</p>
            <p style="font-size:12px" class="my-0">뉴스 : 네이버 검색 API | 코로나 확진자: 보건복지부 코로나 감염 현황 API</p>
            <p class="copyright-text text-left">Copyright &copy; {{year}} All Rights Reserved by 
             <span style="cursor:pointer; color: #3c90e2;" @click.stop="dialog = true">A206</span>.
            </p>

          </div>
        </div>
      </div>
      <v-dialog
          v-model="dialog"
          max-width="600"
        >
        <v-card>
          <div class="pop-head text-left" >
            <strong class="tit">Members</strong>
          </div>

          <img src="./assets/member2.png" style="width: 100%" alt="member">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="#0f4c81"
              text
              @click="dialog = false"
            >
              확인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="ToU"
          max-width="600"
        >
        <v-card>
          <div class="pop-head text-left" >
            <strong class="tit">이용약관</strong>
          </div>
            <div class="text-left mx-2">
            <strong>제 1 장 총칙</strong><br>
          <p>
            <strong>제 1 조 (목적)</strong><br>
            본 약관은 A206이 운영하는 웹 사이트 (http://ssafytemp.kro.kr/)의 제반 서비스의 이용조건 및 절차에 관한 사항 및 기타 필요한 사항을 규정함을 목적으로 한다.
            <br><br>
            제 2 조 (용어의 정의)<br>
            본 약관에서 사용하는 용어는 다음과 같이 정의한다.<br>
            ①관리자 : A206에게 서비스 이용권한을 부여받은 SSAFY 관련인원<br>
            ②아이디(ID) : 관리자 식별과 서비스 이용을 위해 A206이 승인한 문자와 숫자의 조합<br>
            ③비밀번호(Password) : 비밀을 보호하기 위해 선정한 문자와 숫자의 조합<br>

            제 3 조 (약관의 공시 및 효력과 변경)<br>
            ①본 약관은 메인 화면 하단에 게시하여 공시하며, 사정변경 및 영업상 중요한 사유가 있을 경우 약관을 변경할 수 있으며 변경된 약관은 메인화면 하단을 통해 공시한다<br>
            ②본 약관 및 차후 사정에 따라 변경된 약관은 이용자에게 공시함으로써 효력을 발생한다.<br><br>

            제 2 장 계약 당사자의 의무<br>

            제 4 조 (팀의 의무)<br>
            ①A206은 사이트를 안정적이고 지속적으로 운영할 의무가 있다.<br>
            ②A206은 이용자로부터 제기되는 의견이나 불만이 정당하다고 인정될 경우에는 즉시 처리해야 한다. 단, 즉시 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 공지사항 또는 전자우편을 통해 통보해야 한다.
           <br> ③제1항의 경우 수사상의 목적으로 관계기관 및 정보통신윤리위원회의 요청이 있거나 영장 제시가 있는 경우, 기타 관계 법령에 의한 경우는 예외로 한다.<br><br>

            제 5 조 (이용자의 의무)<br>
            ①이용자는 본 약관 및 사이트 이용안내 등을 숙지하고 준수해야 하며 기타 팀의 업무에 방해되는 행위를 해서는 안된다.<br>
            ②이용자는 팀의 사전 승인 없이 본 사이트를 이용해 어떠한 영리행위도 할 수 없다.<br>
            ③이용자는 본 사이트를 통해 얻는 정보를 회사의 사전 승낙 없이 복사, 복제, 변경, 번역, 출판, 방송 및 기타의 방법으로 사용하거나 이를 타인에게 제공할 수 없다.<br><br>

            제 3 장 서비스의 제공 및 이용<br><br>

            제 6 조 (서비스 이용)<br>
            ①이용자는 본 약관의 규정된 사항을 준수해 사이트를 이용한다.<br>
            ②본 약관에 명시되지 않은 서비스 이용에 관한 사항은 A206이 정해 별도로 공지하는 내용에 따른다.<br>

            제 7 조 (정보의 제공)<br>
            팀은 회원이 서비스 이용 중 필요하다고 인정되는 다양한 정보에 대하여 전자메일이나 서신우편 등의 방법으로 회원에게 정보를 제공할 수 있다.<br><br>

            제 8 조 (광고게재)<br>
            ①A206은 서비스의 운용과 관련하여 서비스 화면, 홈페이지, 전자우편 등에 광고 등을 게재할 수 있다.<br>
            ②A206은 사이트에 게재되어 있는 광고주의 판촉활동에 회원이 참여하거나 교신 또는 거래의 결과로서 발생하는 모든 손실 또는 손해에 대해 책임을 지지 않는다.<br><br>

            제 9 조 (서비스 이용의 제한)<br>
            본 사이트 이용 및 행위가 다음 각 항에 해당하는 경우 A206은 해당 이용자의 이용을 제한할 수 있다.<br>
            ①공공질서 및 미풍양속, 기타 사회질서를 해하는 경우<br>
            ②범죄행위를 목적으로 하거나 기타 범죄행위와 관련된다고 객관적으로 인정되는 경우<br>
            ③타인의 명예를 손상시키거나 타인의 서비스 이용을 현저히 저해하는 경우<br>
            ④타인의 의사에 반하는 내용이나 광고성 정보 등을 지속적으로 전송하는 경우<br>
            ⑤해킹 및 컴퓨터 바이러스 유포 등으로 서비스의 건전한 운영을 저해하는 경우<br>
            ⑥다른 이용자 또는 제3자의 지적재산권을 침해하거나 지적재산권자가 지적 재산권의 침해를 주장할 수 있다고 판단되는 경우<br>
            ⑦관리자의 아이디 및 비밀번호를 도용한 경우<br>
            ⑧기타 관계 법령에 위배되는 경우 및 이용자로서 부적당하다고 판단한 경우<br><br>

            제 10 조 (서비스 제공의 중지)<br>
            A206은 다음 각 호에 해당하는 경우 서비스의 전부 또는 일부의 제공을 중지할 수 있다.<br>
            ①전기통신사업법 상에 규정된 기간통신 사업자 또는 인터넷 망 사업자가 서비스를 중지했을 경우<br>
            ②정전으로 서비스 제공이 불가능할 경우<br>
            ③설비의 이전, 보수 또는 공사로 인해 부득이한 경우<br>
            ④서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 정상적인 서비스 제공이 어려운 경우<br>
            ⑤전시, 사변, 천재지변 또는 이에 준하는 국가비상사태가 발생하거나 발생할 우려가 있는 경우<br><br>

            제 11 조 (서비스 이용 책임)<br>
            이용자는 A206에서 명시적인 서면에 구체적으로 허용한 경우를 제외하고는 서비스를 이용하여 불법상품을 판매하는 영업활동을 할 수 없으며 특히 해킹, 돈벌기 광고, 음란 사이트를 통한 상업행위, 상용 S/W 불법제공 등을 할 수 없다. 이를 어기고 발생한 영업활동의 결과 및 손실, 관계기관에 의한 구속 등 법적 조치 등에 관해서는 회사가 책임을 지지 않는다.
            <br>

            <br><br>부칙
            <br>본 약관은 2020년 07월 18일부터 적용한다.
          </p>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="#0f4c81"
              text
              @click="ToU = false"
            >
              확인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="PP"
          max-width="600"
        >
        <v-card>
          <div class="pop-head text-left" >
            <strong class="tit">개인정보처리방침</strong>
          </div>
          <div class="text-left mx-2">
            <p class="ls2 lh6 bs5 ts4">A206 ('http://ssafytemp.kro.kr/'이하  'SSAFYTEMP')은(는) 이용자의 편의를 위해 SSAFY 학생의 이름, 지역, 기수, 반, 매터모스트 ID를 제공합니다.</p>
            <p class="ls2 lh6 bs5 ts4">A206 ('SSAFYTEMP') 은(는) 프로젝트가 끝남과 동시에 모든 DB의 학생 정보를 삭제할 예정입니다.</p>
            <p class="ls2">○ 본 방침은부터 2020년 7월 18일부터 시행됩니다.</p><br>
            <p class='lh6 bs4'><strong>1. 개인정보의 처리 목적 A206('http://ssafytemp.kro.kr/'이하  'SSAFYTEMP')은(는) 개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는 다음의 목적이외의 용도로는 사용되지 않습니다.</strong></p>
            <ul class="list_indent2 mgt10"><p class="ls2">가. 홈페이지</p>
            <p class="ls2">서비스 제공에 따른 학생 체온 기록, 학생 분류 등을 목적으로 개인정보를 처리합니다.</p><br>
            <p class="ls2">나. 서비스 제공</p>
            <p class="ls2">서비스 제공(매터모스트 DM) 등을 목적으로 개인정보를 처리합니다.</p></ul>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="#0f4c81"
              text
              @click="PP = false"
            >
              확인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </footer>
  </v-app>
  
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
const sessionStore = 'sessionStore'
const studentsStore = 'studentsStore'
export default {
  name: 'App',
  components: {
  },
  methods: {
    ...mapActions(sessionStore, [
      'signin',
    ]),
    ...mapMutations(sessionStore, [
      'GETPAGE',
      'SETWIDTH',
      'SETDRAWER',
    ]),
    signout() {     
      sessionStorage.clear()
      this.isLoggedIn = false   
      this.goHome()
      this.$router.go(0)
    },
    goHome() {
      if (this.$route.name !== 'Home'){
        this.$router.push('/')
      }
    },
    widthCheck() {
        this.SETWIDTH(window.innerWidth)
        if (this.drawer == true && this.windowWidth >= 960) {
        this.drawer = false}
    },    
  },
  mounted() {
    window.addEventListener('resize', _.debounce(this.widthCheck, 33))
    
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.widthCheck)
  },
  computed: {    
    ...mapState(sessionStore, [
      'isLoggedIn',
      'pages'
    ]),
    ...mapGetters(sessionStore, [
      'windowWidth'
    ]),
    ...mapGetters(studentsStore, [
      'messageSuccess',
      'messageFail',
      'messageBox',
    ]),
    year: () => new Date().getFullYear(),
  },
  watch: {
    drawer() {
      this.SETDRAWER(this.drawer)
    }
  },
  data() {
    return {
      dialog: false,
      ToU: false,
      PP: false,
      drawer: false,
      pagesTwo: {
         'Home': '2주간 (8.16~29) 서울, 경기 지역 사회적 거리 두기 2단계 격상',
         'Temperature': '체온 확인',
         'Students': '학생 관리',
         'Signin': '로그인',
         'update': '학생 수정',
         'register': '학생 등록'
      },
    };
  },
  created() {
  }
}
</script>

<style scoped>
#app {
  font-family: IBMPlexSansKR-Regular !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.appbar {
  max-width: 1300px !important ;
  
}
.logo {
  height: 40px;
}
.navdrawer {
  position: fixed;
  height: 100vh;
}
.mainpage {
  margin-top: 64px;
}
.navbtn {
  height: 100vh;
}
.toolbaritem {
  margin-left: 50px;
}
.site-footer
{
  background-color:#26272b;
  padding:0px 0 20px;
  font-size:15px;
  line-height:24px;
  color:#737373;
}
.site-footer::after {
  z-index:-1;
}
.site-footer hr
{
  border-top-color:#bbb;
  opacity:0.5
}
.site-footer hr.small
{
  margin:20px 0
}
.site-footer h6
{
  color:#fff;
  font-size:16px;
  text-transform:uppercase;
  margin-top:5px;
  letter-spacing:2px
}
.site-footer a
{
  color:#737373;
}
.site-footer a:hover
{
  color:#3366cc;
  text-decoration:none;
}
.footer-links
{
  padding-left: 0;
  list-style:none
}
.footer-links li
{
  display:block
}
.footer-links a
{
  color:#737373
}
.footer-links a:active,.footer-links a:focus,.footer-links a:hover
{
  color:#3366cc;
  text-decoration:none;
}
.footer-links.inline li
{
  display:inline-block
}
.site-footer .social-icons
{
  text-align:right
}

.copyright-text
{
  margin:0
}
.pop-head {
    position: relative;
    background-color: #0f4c81;
    padding: 20px 60px 20px 40px;
}
.pop-head .tit {
    font-size: 20px;
    color: #fff;
    font-weight: 500;
}
.test {
  border-bottom: solid 1px black !important;
}
.test-2 {
  color: #0f4c81 !important;
}
.footer-margin {
  margin-bottom: 90px;
}
@media (max-width:991px)
{
  .site-footer [class^=col-]
  {
    margin-bottom:0px
  }
}
@media (max-width:767px)
{
  .site-footer
  {
    padding-bottom:0
  }
  .site-footer .copyright-text
  {
    text-align:center
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
 {
  transform: translateY(0);
  opacity: 0;
}
.alert {
  position: fixed;
  width: 300px;
  height: 50px;
  z-index: 999;
  left: 50%;
  margin-left: -150px;
  top: 50%;
  margin-top: -25px;

}


</style>