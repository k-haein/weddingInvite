//스크롤 시 하나씩 보여짐
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target); //한번만 애니메이션 실행
      }
    });
  },
  {
    threshold: 0.1, //10%만 보이면 실행
  }
);

//모든 section에 적용
document.querySelectorAll(".section").forEach((section) => {
  observer.observe(section);
});

// 갤러리 모달 기능
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const galleryImgs = document.querySelectorAll(".gallery-img");
let currentIndex = 0;

galleryImgs.forEach((img, index) => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;
    currentIndex = index;
  });
});

document.getElementById("close").onclick = () => (modal.style.display = "none");
document.getElementById("prev").onclick = () => changeImg(-1);
document.getElementById("next").onclick = () => changeImg(1);

function changeImg(direction) {
  currentIndex =
    (currentIndex + direction + galleryImgs.length) % galleryImgs.length;
  modalImg.src = galleryImgs[currentIndex].src;
}


//캘린더 설정
const calendarEl = document.getElementById('calendar');
const calendar = new FullCalendar.Calendar(calendarEl,{
  initialView:'dayGridMonth',
  initialDate:'2026-02-28',
  now:'2026-02-28',
  headerToolbar:{
    left:'',
    center:'',
    right:''
  },
  events:[],
  selectable:false,
  editable:false,
  navLinks:false,
  dayMaxEvents:false,
  fixedWeekCount:false,
  contentHeight:'auto',
  eventClick:()=>false,
  eventMouseEnter:()=>false,
})

calendar.render();


//카카오맵 실행스크립트
new daum.roughmap.Lander({
  timestamp: "1747296746915",
  key: "2o2ie",
  mapWidth: "400",
  mapHeight: "240",
}).render();


// 오시는길 토글
const toggleArea = document.getElementById('locationToggle');
const wrapper = document.querySelector('.location-wrapper');

toggleArea.addEventListener('click', function () {
  wrapper.classList.toggle('open');
});



//계좌번호 토글
function toggleInfo(num) {
  const content = document.getElementById("infoContent" + num);
  const arrow = document.getElementById("info-arrow" + num);
  if (content.style.display === "none" || content.style.display === "") {
    content.style.display = "block";
    arrow.textContent = "▼";
  } else {
    content.style.display = "none";
    arrow.textContent = "▲";
  }
}

//클립보드 복사
function copyToClipboard(id) {
  if(id == 'url'){ 
    const text = window.location.href;
  }else{
    const text = document.getElementById(id).textContent;
  }
  navigator.clipboard.writeText(text).then(() => {
    alert("복사되었습니다!");
  }, () => {
    alert("복사에 실패했습니다.");
  });
}


//링크 공유
function shareKakao() {
  // 카카오 SDK를 이미 로드했다고 가정 (아래 참고)
  Kakao.Share.sendScrap({
    requestUrl: window.location.href,
  });
}


function shareMessage() {
  Kakao.Share.sendDefault({
    objectType: 'location',
    address: '경기 성남시 분당구 판교역로 166 3층',
    addressTitle: '카카오 판교아지트 카페톡',
    content: {
      title: '신메뉴 출시♥︎ 체리블라썸라떼',
      description: '이번 주는 체리블라썸라떼 1+1',
      imageUrl:
        'images/서브사진.jpg',
      link: {
        // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
        mobileWebUrl: 'https://developers.kakao.com',
        webUrl: 'https://developers.kakao.com',
      },
    },
    // social: {
    //   likeCount: 286,
    //   commentCount: 45,
    //   sharedCount: 845,
    // },
    buttons: [
      {
        title: '웹으로 보기',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com',
        },
      },
    ],
  });
}

function githubLink(){

}