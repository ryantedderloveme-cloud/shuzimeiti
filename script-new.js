// AIGC探索

document.addEventListener('DOMContentLoaded', function() {
  // 移动菜单切换功能
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const primaryMenu = document.getElementById('primary-menu');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      primaryMenu.classList.toggle('active');
      
      // 更新汉堡菜单图标为X
      const bars = this.querySelectorAll('.toggle-bar');
      if (!isExpanded) {
        bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });
  }
  
  // 高对比度模式切换
  const contrastToggle = document.getElementById('contrast-toggle');
  if (contrastToggle) {
    contrastToggle.addEventListener('click', function() {
      document.body.classList.toggle('high-contrast');
      
      // 更新按钮状态提示
      const isHighContrast = document.body.classList.contains('high-contrast');
      this.setAttribute('aria-label', isHighContrast ? '切换回普通对比度模式' : '切换高对比度模式');
      
      // 保存用户偏好到本地存储
      localStorage.setItem('highContrastMode', isHighContrast);
    });
    
    // 加载保存的对比度偏好
    const savedContrastMode = localStorage.getItem('highContrastMode');
    if (savedContrastMode === 'true') {
      document.body.classList.add('high-contrast');
      contrastToggle.setAttribute('aria-label', '切换回普通对比度模式');
    }
  }
  
  // 字体大小调整
  const fontIncrease = document.getElementById('font-increase');
  const fontDecrease = document.getElementById('font-decrease');
  
  if (fontIncrease && fontDecrease) {
    let fontSize = 16; // 基准字体大小
    
    fontIncrease.addEventListener('click', function() {
      if (fontSize < 22) {
        fontSize += 2;
        document.documentElement.style.fontSize = fontSize + 'px';
        updateFontSizeButtons();
      }
    });
    
    fontDecrease.addEventListener('click', function() {
      if (fontSize > 12) {
        fontSize -= 2;
        document.documentElement.style.fontSize = fontSize + 'px';
        updateFontSizeButtons();
      }
    });
    
    function updateFontSizeButtons() {
      // 更新按钮状态
      fontIncrease.disabled = fontSize >= 22;
      fontDecrease.disabled = fontSize <= 12;
      
      // 更新ARIA标签
      fontIncrease.setAttribute('aria-label', fontSize >= 22 ? 
        '字体大小已到最大值' : '增大字体大小');
      fontDecrease.setAttribute('aria-label', fontSize <= 12 ? 
        '字体大小已到最小值' : '减小字体大小');
      
      // 保存用户偏好
      localStorage.setItem('fontSize', fontSize);
    }
    
    // 加载保存的字体大小
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      fontSize = parseInt(savedFontSize);
      document.documentElement.style.fontSize = fontSize + 'px';
    }
    updateFontSizeButtons();
  }
  
  // 为所有卡片添加键盘导航支持
  const focusableCards = document.querySelectorAll('.feature-card, .update-card');
  focusableCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    
    // 添加键盘事件支持
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const link = this.querySelector('a');
        if (link) {
          link.click();
        }
      }
    });
  });
  
  // 增强链接焦点可见性
  const allLinks = document.querySelectorAll('a');
  allLinks.forEach(link => {
    link.addEventListener('focus', function() {
      this.style.outline = '2px solid ' + getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
      this.style.outlineOffset = '3px';
    });
    
    link.addEventListener('blur', function() {
      this.style.outline = '';
    });
  });
  
  // 页面加载完成后将焦点设置到主要内容区域
  const skipLink = document.querySelector('.skip-to-main');
  const mainContent = document.getElementById('main-content');
  
  if (skipLink && mainContent) {
    skipLink.addEventListener('click', function(e) {
      e.preventDefault();
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus();
    });
  }
  
  // 为功能卡片添加悬停效果增强
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.feature-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.feature-icon');
      if (icon) {
        icon.style.transform = 'scale(1)';
      }
    });
  });
  
  // 检测用户是否使用键盘导航（Tab键）
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
  });
  
  // 为所有按钮添加视觉反馈
  const allButtons = document.querySelectorAll('button, .btn');
  allButtons.forEach(button => {
    button.addEventListener('focus', function() {
      this.classList.add('focused');
    });
    
    button.addEventListener('blur', function() {
      this.classList.remove('focused');
    });
  });
  
  // 初始化页面
  console.log('AIGC探索网站已加载完成。');
});