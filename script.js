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

const galleryImgs = document.querySelectorAll(".gallery-img");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const closeBtn = document.getElementById("close");
const loadMoreBtn = document.getElementById("loadMoreBtn");

const allImgs = Array.from(galleryImgs);
const imagesPerLoad = 12;
let currentIndex = 0;
let modalIndex = 0;

function showImages() {
  for (let i = currentIndex; i < currentIndex + imagesPerLoad; i++) {
    if (allImgs[i]) {
      allImgs[i].style.display = "block";
    }
  }
  currentIndex += imagesPerLoad;

  if (currentIndex >= allImgs.length) {
    loadMoreBtn.style.display = "none";
  }
}

// 초기 이미지 숨김
allImgs.forEach((img) => (img.style.display = "none"));
showImages();

loadMoreBtn.addEventListener("click", showImages);

// 모달 열기
allImgs.forEach((img, i) => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;
    modalIndex = i;
  });
});

// 모달 닫기
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// 이전 이미지
prevBtn.addEventListener("click", () => {
  modalIndex = (modalIndex - 1 + allImgs.length) % allImgs.length;
  modalImg.src = allImgs[modalIndex].src;
});

// 다음 이미지
nextBtn.addEventListener("click", () => {
  modalIndex = (modalIndex + 1) % allImgs.length;
  modalImg.src = allImgs[modalIndex].src;
});

// ESC 키로 닫기
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.style.display = "none";
  }
});

//캘린더 설정
const calendarEl = document.getElementById("calendar");
const calendar = new FullCalendar.Calendar(calendarEl, {
  initialView: "dayGridMonth",
  initialDate: "2026-02-28",
  now: "2026-02-28",
  headerToolbar: {
    left: "",
    center: "",
    right: "",
  },
  events: [
    {
      start: "2026-02-28",
      icon: "💍",
      display: "block",
      backgroundColor: "transparent",
      borderColor: "transparent",
      textColor: "#000",
    },
  ],
  eventContent: function (arg) {
    const icon = arg.event.extendedProps.icon;
    const title = arg.event.title;

    return {
      html: `
            <div style="text-align:center;">
              <div style="font-size: 1.3rem;">${icon || ""}</div>
              <div style="font-size: 0.9rem;">${title}</div>
            </div>
          `,
    };
  },
  selectable: false,
  editable: false,
  navLinks: false,
  dayMaxEvents: false,
  fixedWeekCount: false,
  contentHeight: "auto",
  eventClick: () => false,
  eventMouseEnter: () => false,
});

calendar.render();

//카운트다운
function updateCountdown() {
  const targetDate = new Date("2026-02-28T11:00:00"); // 목표 시간
  const now = new Date();
  const diff = targetDate - now;

  const timeEl = document.getElementById("time");
  const messageEl = document.getElementById("message");

  if (diff <= 0) {
    timeEl.innerText = "0일 0시간 0분 0초";
    messageEl.innerText = "시간이 종료되었습니다.";
    clearInterval(timer);
    return;
  }

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / 1000 / 60) % 60;
  const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);

  timeEl.innerText = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
  messageEl.innerText = "남았습니다.";
}

const timer = setInterval(updateCountdown, 1000); // 1초마다 갱신
updateCountdown();

// 기본캘린더 저장
function downloadICS() {
  const icsContent = `
    BEGIN:VCALENDAR
    VERSION:2.0
    PRODID:-//Your Site//Event//EN
    BEGIN:VEVENT
    UID:${Date.now()}@yoursite.com
    DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
    DTSTART:20260228T020000Z
    DTEND:20260228T030000Z
    SUMMARY:재민♥해인 결혼식
    DESCRIPTION:결혼식 와주실꺼죠?ㅎㅎ
    LOCATION:7호선 삼산체육관역 삼산월드컨벤션 웨딩홀
    END:VEVENT
    END:VCALENDAR
  `.trim();

  const blob = new Blob([icsContent], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "wedding-invitation.ics";
  a.click();
  URL.revokeObjectURL(url);
}

// 오시는길 토글
const toggleArea = document.getElementById("locationToggle");
const wrapper = document.querySelector(".location-wrapper");

toggleArea.addEventListener("click", function () {
  wrapper.classList.toggle("open");
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
  var text = "";
  if (id == "url") {
    text = window.location.href;
  } else {
    text = document.getElementById(id).textContent;
  }
  navigator.clipboard.writeText(text).then(
    () => {
      alert("복사되었습니다!");
    },
    () => {
      alert("복사에 실패했습니다.");
    }
  );
}

//카카오 링크 공유
function shareMessage() {
  Kakao.Share.sendDefault({
    objectType: "location",
    address: "인천 부평구 체육관로 60 삼산월드컨벤션 웨딩홀",
    addressTitle: "삼산월드컨벤션 웨딩홀",
    content: {
      title: "이봐봐 ♥ 김뫄뫄 결혼합니다!",
      description: "2026년 2월 28일 토요일 오전 11시",
      imageUrl: "/images/sub.JPG",
      link: {
        // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
        mobileWebUrl: "https://k-haein.github.io/weddingInvite/",
        webUrl: "https://k-haein.github.io/weddingInvite/",
      },
    },
    buttons: [
      {
        title: "웹으로 보기",
        link: {
          mobileWebUrl: "https://k-haein.github.io/weddingInvite/",
          webUrl: "https://k-haein.github.io/weddingInvite/",
        },
      },
    ],
  });
}

function githubLink() {
  window.open("https://github.com/k-haein/weddingInvite");
}

//카카오맵 실행스크립트
new daum.roughmap.Lander({
  timestamp: "1747296746915",
  key: "2o2ie",
  mapWidth: "400",
  mapHeight: "240",
}).render();

function kakaoNavi() {
  Kakao.Navi.share({
    name: "삼산월드컨벤션 웨딩홀",
    x: 126.738249,
    y: 37.507808,
    coordType: "wgs84",
  });
}
