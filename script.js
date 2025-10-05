(function(){function n(){document.querySelectorAll('.t-zoomer__scale').forEach(e=>e.remove())}n();new MutationObserver(n).observe(document.body,{childList:!0,subtree:!0})})();


(function(){const e=()=>{document.querySelectorAll('.t-carousel__zoomed .t-carousel__zoomer__imagebox,.t-carousel__zoomed .t-carousel__zoomer__inner,.t-carousel__zoomed .t-carousel__zoomer__img').forEach(t=>t.style.cursor='default')};e();new MutationObserver(e).observe(document.body,{subtree:!0,childList:!0})})();


(function(){const e=matchMedia('(hover:hover) and (pointer:fine)').matches;function t(){const t=document.querySelector('.t-carousel__zoomed');if(!t)return;const o=t.querySelector('.t-carousel__zoomer__inner')||t,r=t.querySelector('.t-carousel__zoomer__img');if(r){r.setAttribute('draggable','false');r.addEventListener('dragstart',e=>{e.preventDefault(),e.stopPropagation()},{capture:!0})}const i=e=>{e.stopPropagation(),e.preventDefault()};o.addEventListener('click',i,{capture:!0}),o.addEventListener('dblclick',i,{capture:!0});function n(e){const o=`__edgeclick __${e}`;let r=t.querySelector(`.${'left'===e?'__edgeclick.__left':'__edgeclick.__right'}`);return r||(r=document.createElement('div'),r.className=o,r.style.cursor='pointer',t.appendChild(r),r.addEventListener('click',o=>{o.stopPropagation(),o.preventDefault(),'right'===e?(t.querySelector('.t-carousel__zoomer__arrow__wrapper_right, .t-carousel__zoomer__arrow_wrapper_right')||t.querySelector('.t-carousel__zoomer__arrow_right'))?.click():(t.querySelector('.t-carousel__zoomer__arrow__wrapper_left, .t-carousel__zoomer__arrow_wrapper_left')||t.querySelector('.t-carousel__zoomer__arrow_left'))?.click()},{passive:!0})),r}n('left'),n('right');if(e&&!t.__dragBound){let o=0,r=0,i=!1;const n=40;const c=e=>!!e.target.closest('.t-carousel__zoomer__close,.t-carousel__zoomer__arrow__wrapper,.t-carousel__zoomer__arrow_wrapper,.t-carousel__zoomer__arrow,.__edgeclick');const a=e=>{0===e.button&&!c(e)&&(i=!0,o=e.clientX,r=0,document.body.style.userSelect='none')},l=e=>{i&&(r=e.clientX-o)},s=()=>{if(!i)return;i=!1,document.body.style.userSelect='',Math.abs(r)>=n&&(r<0?(t.querySelector('.t-carousel__zoomer__arrow__wrapper_right, .t-carousel__zoomer__arrow_wrapper_right')||t.querySelector('.t-carousel__zoomer__arrow_right'))?.click():(t.querySelector('.t-carousel__zoomer__arrow__wrapper_left, .t-carousel__zoomer__arrow_wrapper_left')||t.querySelector('.t-carousel__zoomer__arrow_left'))?.click())};t.addEventListener('mousedown',a,{passive:!0}),window.addEventListener('mousemove',l,{passive:!0}),window.addEventListener('mouseup',s,{passive:!0}),t.__dragBound=!0}}t();new MutationObserver(t).observe(document.body,{childList:!0,subtree:!0})})();


// Скрипт слайдера Dsgnmax


document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.js-store-grid-cont');

  containers.forEach((container) => {
    const parent = container.closest('[class*="uc-slider-shop"]');
    if (parent) {
      container.addEventListener('tStoreRendered', () => initializeSwiper(container, parent));
    }
  });

  function initializeSwiper(container, parent) {
    const slides = container.querySelectorAll('.js-product');

    container.classList.add('swiper');
    const wrapper = document.createElement('div');
    wrapper.classList.add('swiper-wrapper');

    slides.forEach((slide) => {
      slide.classList.add('swiper-slide');
      wrapper.appendChild(slide);
    });

    container.innerHTML = '';
    container.appendChild(wrapper);

    const dbmNextButton = document.createElement('div');
    dbmNextButton.classList.add('swiper-button-next-dbm');
    const dbmPrevButton = document.createElement('div');
    dbmPrevButton.classList.add('swiper-button-prev-dbm');
    const scrollbar = document.createElement('div');
    scrollbar.classList.add('swiper-scrollbar-dbm');

    container.appendChild(dbmNextButton);
    container.appendChild(dbmPrevButton);
    container.appendChild(scrollbar);

    let swiperConfig = {
      loop: false,
      navigation: {
        nextEl: dbmNextButton,
        prevEl: dbmPrevButton,
      },
      scrollbar: {
        el: '.swiper-scrollbar-dbm',
        draggable: true,
      },
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      effect: 'slide',
      speed: 400,
      slidesPerView: 4,
      spaceBetween: 20,
      slidesPerGroup: 2,
      breakpoints: {
        320: { slidesPerView: 1, slidesPerGroup: 1 },
        480: { slidesPerView: 2, slidesPerGroup: 1 },
        640: { slidesPerView: 2, slidesPerGroup: 1 },
        768: { slidesPerView: 3, slidesPerGroup: 1 },
        1000: { slidesPerView: 4, slidesPerGroup: 1 },
        1360: { slidesPerView: 4, slidesPerGroup: 1 },
        1920: { slidesPerView: 4, slidesPerGroup: 1 }
      }
    };

    if (parent.classList.contains('uc-slider-shop-1')) {
      swiperConfig.speed = 400;
      swiperConfig.slidesPerGroup = 3;
      swiperConfig.slidesPerView = 4;
      swiperConfig.breakpoints = {
        320: { slidesPerView: 1, slidesPerGroup: 1 },
        480: { slidesPerView: 2, slidesPerGroup: 1 },
        640: { slidesPerView: 2, slidesPerGroup: 1 },
        768: { slidesPerView: 3, slidesPerGroup: 1 },
        1000: { slidesPerView: 4, slidesPerGroup: 1 },
        1360: { slidesPerView: 5, slidesPerGroup: 1 },
        1920: { slidesPerView: 4, slidesPerGroup: 2 }
      };
    }

    const swiper = new Swiper(container, swiperConfig);
    window.addEventListener('resize', () => swiper.update());
    swiper.init();
  }

  containers.forEach((container) => {
    const event = new Event('tStoreRendered');
    container.dispatchEvent(event);
  });
});

// Высота карточек
function setEqualHeight() {
  const elements = document.querySelectorAll('[class*="uc-slider-shop"] .t-store__card__textwrapper');
  if (elements.length === 0) return;
  elements.forEach(el => el.style.height = 'auto');
  let maxHeight = 0;
  elements.forEach(el => {
    const height = el.offsetHeight;
    if (height > maxHeight) {
      maxHeight = height;
    }
  });
  elements.forEach(el => el.style.height = `${maxHeight}px`);
}
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
document.addEventListener('DOMContentLoaded', setEqualHeight);
window.addEventListener('resize', debounce(setEqualHeight, 250));
const observerHeighCard = new MutationObserver(debounce(setEqualHeight, 250));
observerHeighCard.observe(document.body, { childList: true, subtree: true });





















t_onReady(function(){var RK="tbReloadedAfterNotify";try{sessionStorage.getItem(RK)&&sessionStorage.removeItem(RK)}catch(e){};/* === ПОРТАЛ ДЛЯ ТУЛТИПА (вынесен из размеров) === */var tip=document.createElement("div");tip.className="tb-notify-tip";tip.textContent="Сообщить о поступлении";document.body.appendChild(tip);function showTipFor(el){var r=el.getBoundingClientRect();/* сначала показать вне экрана, чтобы получить размеры */tip.style.opacity="0.001";tip.style.left="-9999px";tip.style.top="-9999px";var tw=tip.offsetWidth,th=tip.offsetHeight;var left=r.left+r.width/2-tw/2;left=Math.max(12,Math.min(left,innerWidth-tw-12));var top=r.top-th-8;if(top<12) top=r.bottom+8;tip.style.left=left+"px";tip.style.top=top+"px";tip.style.opacity="1"}function hideTip(){tip.style.opacity="0";tip.style.left="-9999px";tip.style.top="-9999px"}addEventListener("scroll",hideTip,{passive:!0});addEventListener("resize",hideTip);/* === ТВОИ ВКУСНЫЕ ТОГЛЫ (клики по недоступным размерам) === */t_onFuncLoad("t_store_init",function(){setupNotifyHandlers()});function setupNotifyHandlers(){document.querySelectorAll("label.t-product__option-item_disabled").forEach(function(label){label.style.pointerEvents="auto";label.style.cursor="pointer";var input=label.querySelector("input");if(input) input.disabled=!0;/* hover/focus для выносного тултипа */if(!label._tbTipBound){label.addEventListener("mouseenter",function(){showTipFor(label)});label.addEventListener("mouseleave",hideTip);label.addEventListener("focusin",function(){showTipFor(label)});label.addEventListener("focusout",hideTip);label._tbTipBound=1}/* накладка-ссылка */if(label.querySelector(".notify-link")) return;var link=document.createElement("a");link.href="#zeropopup";link.className="notify-link";label.style.position="relative";label.appendChild(link);link.addEventListener("click",function(){var size=(label.querySelector("input")?.value||"—").trim(),name=(document.querySelector(".js-store-prod-name")?.textContent||document.title).trim(),color=(document.querySelector('input[name="Цвет"]:checked')?.value||"—").trim(),formText="Сообщить о поступлении";setTimeout(function(){var popup=document.querySelector(".t-popup_show");if(!popup) return;var form=popup.querySelector("form");if(!form) return;var f=form.querySelector('input[name="Форма"]'),n=form.querySelector('input[name="Название"]'),c=form.querySelector('input[name="Цвет"]'),s=form.querySelector('input[name="Размер"]');if(f) f.value=formText;if(n) n.value=name;if(c) c.value=color;if(s) s.value=size},300)})})}new MutationObserver(function(){setupNotifyHandlers()}).observe(document.body,{childList:!0,subtree:!0});/* === ЛОГ В TEXTAREA (как у тебя) === */document.addEventListener("submit",function(e){var form=e.target.closest(".t-popup_show form");if(!form) return;var formType=form.querySelector('input[name="Форма"]')?.value||"—",email=form.querySelector('input[name="email"]')?.value||"—",name=form.querySelector('input[name="Название"]')?.value||"—",color=form.querySelector('input[name="Цвет"]')?.value||"—",size=form.querySelector('input[name="Размер"]')?.value||"—",ta=form.querySelector('textarea[name="Сообщение"]');if(ta) ta.value="Содержание заявки:\nФорма: "+formType+"\n\nemail: "+email+"\nНазвание: "+name+"\nЦвет: "+color+"\nРазмер: "+size+"\n\n"+location.href},{capture:!0});/* === ProductUrl === */var productUrlField=document.querySelector('input[name="ProductUrl"]');if(productUrlField) productUrlField.value=location.href;/* === SUCCESS: чёрный + скругления + reload только при успехе === */var successObserver=new MutationObserver(function(){var box=document.querySelector(".js-successbox.t-form__successbox");if(!box) return;box.style.backgroundColor="#000";box.style.color="#fff";box.style.borderRadius="10px";box.style.padding="20px";box.style.marginBottom="20px";box.style.textAlign="center";box.style.fontSize="16px";box.style.fontFamily="'SF Pro Display', sans-serif";box.style.fontWeight="500";var inner=box.querySelector('[data-customstyle="yes"]');if(inner){inner.style.color="#fff";inner.style.fontSize="16px";inner.style.fontWeight="500"}var wrap=box.closest(".t-form, .t-popup, body");var marker=wrap?.querySelector('input[name="Форма"]')?.value||"";var hasErrors=wrap?.querySelector(".t-form__errorbox-middle, .t-form__errorbox-wrapper, .js-errorbox-all-show, .t-input-error");var visibleErrors=!!(hasErrors&&hasErrors.offsetParent!==null);var visible=box.getClientRects().length>0&&getComputedStyle(box).display!=="none";if(marker==="Сообщить о поступлении"&&visible&&!visibleErrors&&!sessionStorage.getItem(RK)){try{sessionStorage.setItem(RK,"1")}catch(e){};setTimeout(function(){location.reload()},120)}});successObserver.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["style","class"]})});








(function(){let l=location.hash;function c(){location.hash&&history.replaceState(null,null," ")}function w(){location.hash!==l&&(l=location.hash,setTimeout(c,0));requestAnimationFrame(w)};location.hash&&setTimeout(c,0);requestAnimationFrame(w)})();








document.addEventListener("DOMContentLoaded",()=>{const m=()=>{const i=document.querySelector(".t-store__prod-popup__info"),t=document.querySelector(".t-store__tabs_accordion");i&&t&&!i.contains(t)&&i.appendChild(t)};t_onFuncLoad("t_store_init",m);document.addEventListener("click",e=>{e.target.closest('a[href*="/tproduct/"]')&&setTimeout(m,500)})});






