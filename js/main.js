// ScrollMagic 사용
// 그 외 scrollreveal

const spyEls = document.querySelectorAll('section.scroll-spy'); //scroll-spy는 개발자가 작명함


// init controller
const controller = new ScrollMagic.Controller();

// 깊게 이해할필요 없이 문법이 이런거 뿐임
spyEls.forEach(function (spyEl) {
  // create a scene
  new ScrollMagic.Scene({ // 감시할 장면 추가 및 옵션 지정
    triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정 , 객체는 (키: 값) 한쌍
    triggerHook: 0.5 // 화면(뷰포트)의 50% 지점에서 보여짐 여부 감시(0~1사이 지정)
  })
  .setClassToggle(spyEl, 'show') // 메소드 체이닝,요소가 화면에 보이면 show 클래스 추가 , 0.5를 넘어가면 spyEl요소에 show라는 클래스를 추가
  .addTo(controller); // 컨트롤러에 장면을 할당(필수!), 필수로 넣어줘야함
});

// Swiper 사용(공통으로 하려면 .project 지우면됨)
const swiper = new Swiper('.project .swiper', {
  // 슬라이드 옵션 지정
  direction: 'horizontal', // 수평 슬라이드, 반대는 vertical
  loop: true, // 반복 재생 여부, 1 -> 2 -> 3 -> 다시 1로
  // autoplay: { // 자동 재생 여부
  //   delay: 5000 // 5초마다 슬라이드 바뀜
  // }, // 컴마(,) 까먹지 말기

  // 페이지네이션 옵션
  pagination: {
    el: '.project .swiper-pagination',
    clickable: true // 사용자의 페이지네이션 요소 제어 가능 여부 (기본값:false)
  },

  // 이전/다음 슬라이드 버튼 옵션
  navigation: {
    nextEl: '.project .swiper-button-next',
    prevEl: '.project .swiper-button-prev',
  },
});

// 모달창 띄우기
const modal = document.querySelector('#modal');
const modalBtn = document.querySelector('.project .btn-modal');
const closeBtn = document.querySelector('#modal .btn-close');

const imageModal =document.querySelector('#imageModal');
const imageModalBtnList = document.querySelectorAll('.project .btn-modal-image');
const imageCloseBtn = document.querySelector('#imageModal .btn-close');
const imageEl = document.querySelector('#imageModal img');


// Quiz: modalBtn 누르면 모달창이 뜨고 closeBtn 누르면 닫히도록 만들기

modalBtn.addEventListener('click', function() {
  modal.style.display = 'flex'; // 이렇게 스타일 하나만 바꾼다 하면 JS로 하는게 편할 수 있음 , 스타일 여러개바꾸면 코드가 길어져서 아래처럼 하는게 나음
  // modal.classList.add('show'); // 이걸 적고 CSS에 떠넘기면됨. #modal.show { } 여기 안에다 넣으면됨
});
closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
  // modal.classList.remove('show');
});


imageModalBtnList.forEach(function (imageModalBtn) {
  imageModalBtn.addEventListener('click', function () {
    imageEl.src = imageModalBtn.dataset.imageSrc;
    imageModal.style.display = 'flex';
  });
});
imageCloseBtn.addEventListener('click', function () {
    imageModal.style.display = 'none';

});

// 모달 바깥 영역 클릭 시 닫기
modal.addEventListener('click', function (e) { // e: 이벤트 발생 시 이벤트 객체가 전달됨
  console.log(e.target); // 현재 이벤트가 발생한 대상(사용자가 실제 클릭한 가장 안쪽 요소)
  console.log(e.currentTarget); // 이벤트가 바인딩된 요소 (현재 여기서는 modal을 의미 -> <div id='modal'>) , this와 동일
  
  if (e.target === e.currentTarget) { // 이벤트 리스너가 붙은 요소 그 자체를 클릭한 경우만 실행
    modal.style.display = 'none';
  }
});
imageModal.addEventListener('click', function (e) {
    if (e.target === e.currentTarget) {
    imageModal.style.display = 'none';
  }
});
// ESC 키로 닫기
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    modal.style.display = 'none';
    imageModal.style.display = 'none';
  }
})

// 현재 연도 표시
// 날짜 정보를 가진 JS의 Date 객체를 활용 (Date객체의 getFullYear 메소드)
console.log(new Date().getFullYear());
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();

// 페이지 최상단으로 이동
const toTopEl = document.querySelector('#toTop');
// Quiz: visual 섹션 애니메이션 넣고/빼기
// const visualSpanEls = document.querySelectorAll('.animate-flash');
const visualSpanEls = document.querySelectorAll('.visual h1 span');
console.log(visualSpanEls);


// 페이지에 스크롤 이벤트 감지를 추가!
// 브라우저는 문서 전체의 스크롤을 window 기준으로 처리 (항상 우리는 document 앞에 window.을 생략해 왔음)
// document에 붙이면 일부 브라우저에서는 동작 안 함)
// window: 브라우저 창 객체
window.addEventListener('scroll', function () {
  // console.log(window.scrollY); // y축 스크롤 위치

  // Quiz: 페이지 스크롤 위치가 
  // 500px을 넘으면 요소를 보이고
  // 500px을 넘지 않으면 요소 숨기기!
  if (window.scrollY > 500) {
    toTopEl.style.opacity = '1';
    toTopEl.style.transform = 'translateX(0)';

    // visual 섹션 애니메이션 클래스 빼기
    visualSpanEls.forEach(function (visualSpan) {
      visualSpan.classList.remove('animate-flash');
    });
  } else {
    toTopEl.style.opacity = '0';
    toTopEl.style.transform = 'translateX(100px)';

    // visual 섹션 애니메이션 클래스 넣기
    visualSpanEls.forEach(function (visualSpan) {
      visualSpan.classList.add('animate-flash');
    });
  }
});

// 모바일용 메뉴
const hamburgerBtn = document.querySelector('.btn-hamburger');
const navEl = document.querySelector('header nav');
const menuItems = document.querySelectorAll('header nav ul li a') // All을 안붙이면 li 태그중 가장 첫번째 a태그만 가져옴

hamburgerBtn.addEventListener('click' , function () {
  navEl.classList.toggle('active');
});

menuItems.forEach(function (menuItem) {
  menuItem.addEventListener('click' , function () {
    navEl.classList.remove('active');
  });
});
// forEach 문이 어렵다면..... 일반 for문 사용
// for (let i = 0; i < menuItems.length; i++) {
//   menuItem[i].addEventListener('click' , function () {
//     navEl.classList.remove('active');
// });
// }

