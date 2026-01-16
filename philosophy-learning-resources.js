// philosophy-learning-resources.js
// 学习资源页面交互功能

document.addEventListener('DOMContentLoaded', function() {
  // 名言轮播功能
  const quoteSlides = document.querySelectorAll('.philosophy-quote-slide');
  const quoteIndicators = document.querySelectorAll('.philosophy-quote-indicator');
  const prevButton = document.querySelector('.philosophy-quote-prev');
  const nextButton = document.querySelector('.philosophy-quote-next');
  let currentSlide = 0;
  let slideInterval;
  
  // 初始化轮播
  function initQuoteCarousel() {
    // 显示第一个幻灯片
    showSlide(currentSlide);
    
    // 开始自动轮播
    startAutoSlide();
    
    // 添加事件监听器
    if (prevButton) {
      prevButton.addEventListener('click', showPrevSlide);
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', showNextSlide);
    }
    
    // 添加指示器点击事件
    quoteIndicators.forEach(indicator => {
      indicator.addEventListener('click', function() {
        const slideIndex = parseInt(this.getAttribute('data-index'));
        showSlide(slideIndex);
        resetAutoSlide();
      });
    });
    
    // 鼠标悬停时暂停自动轮播
    const carousel = document.querySelector('.philosophy-quote-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', pauseAutoSlide);
      carousel.addEventListener('mouseleave', startAutoSlide);
      carousel.addEventListener('focusin', pauseAutoSlide);
      carousel.addEventListener('focusout', startAutoSlide);
    }
  }
  
  // 显示指定幻灯片
  function showSlide(index) {
    // 隐藏所有幻灯片
    quoteSlides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // 移除所有指示器的active类
    quoteIndicators.forEach(indicator => {
      indicator.classList.remove('active');
    });
    
    // 显示当前幻灯片
    quoteSlides[index].classList.add('active');
    quoteIndicators[index].classList.add('active');
    currentSlide = index;
  }
  
  // 显示下一个幻灯片
  function showNextSlide() {
    currentSlide = (currentSlide + 1) % quoteSlides.length;
    showSlide(currentSlide);
    resetAutoSlide();
  }
  
  // 显示上一个幻灯片
  function showPrevSlide() {
    currentSlide = (currentSlide - 1 + quoteSlides.length) % quoteSlides.length;
    showSlide(currentSlide);
    resetAutoSlide();
  }
  
  // 开始自动轮播
  function startAutoSlide() {
    slideInterval = setInterval(showNextSlide, 5000); // 每5秒切换一次
  }
  
  // 暂停自动轮播
  function pauseAutoSlide() {
    clearInterval(slideInterval);
  }
  
  // 重置自动轮播
  function resetAutoSlide() {
    pauseAutoSlide();
    startAutoSlide();
  }
  
  // 平滑滚动到页面锚点
  const navLinks = document.querySelectorAll('.philosophy-nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // 计算偏移量，考虑固定导航栏的高度
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const navHeight = document.querySelector('.philosophy-page-nav').offsetHeight;
        const offset = headerHeight + navHeight + 20;
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // 更新URL哈希（可选）
        history.pushState(null, null, targetId);
      }
    });
  });
  
  // 学习路线图动画 - 当元素进入视口时触发动画
  const roadmapStages = document.querySelectorAll('.philosophy-roadmap-stage');
  
  function animateOnScroll() {
    roadmapStages.forEach(stage => {
      const stagePosition = stage.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (stagePosition < screenPosition) {
        stage.style.opacity = '1';
        stage.style.transform = 'translateX(0)';
      }
    });
  }
  
  // 初始化动画
  roadmapStages.forEach(stage => {
    stage.style.opacity = '0';
    stage.style.transform = 'translateX(-20px)';
    stage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  });
  
  // 监听滚动事件
  window.addEventListener('scroll', animateOnScroll);
  
  // 初始检查一次
  animateOnScroll();
  
  // 初始化页面
  initQuoteCarousel();
  
  // 添加键盘导航支持
  document.addEventListener('keydown', function(e) {
    // 左右箭头键控制名言轮播
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      showPrevSlide();
      resetAutoSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      showNextSlide();
      resetAutoSlide();
    }
    
    // 空格键暂停/恢复自动轮播
    if (e.key === ' ' && e.target === document.body) {
      e.preventDefault();
      if (slideInterval) {
        pauseAutoSlide();
      } else {
        startAutoSlide();
      }
    }
  });
  
  console.log('学习资源页面已加载完成。');
});