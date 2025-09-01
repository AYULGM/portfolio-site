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