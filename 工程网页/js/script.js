document.addEventListener('DOMContentLoaded', function() {
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    const scriptureDisplay = document.getElementById('scripture-display');
    
    // 音乐控制
    musicToggle.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicToggle.textContent = '暂停音乐';
        } else {
            backgroundMusic.pause();
            musicToggle.textContent = '播放音乐';
        }
    });
    
    // 从localStorage加载设置
    const loadSettings = function() {
        const savedSettings = localStorage.getItem('scriptureSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            
            // 更新文图内容
            if (settings.scriptureText && settings.scriptureReference) {
                scriptureDisplay.innerHTML = `
                    <div class="quote-mark open-quote">"</div>
                    <div class="scripture-text">${settings.scriptureText}</div>
                    <div class="quote-mark close-quote">"</div>
                    <div class="scripture-reference">${settings.scriptureReference}</div>
                `;
            }
            
            // 更新背景颜色
            if (settings.colorTop && settings.colorBottom) {
                document.body.style.background = `linear-gradient(to bottom, ${settings.colorTop}, ${settings.colorBottom})`;
            }
        }
        
        // 加载自定义背景音乐
        const savedMusic = localStorage.getItem('backgroundMusic');
        if (savedMusic && backgroundMusic) {
            // 移除现有的音频源
            while (backgroundMusic.firstChild) {
                backgroundMusic.removeChild(backgroundMusic.firstChild);
            }
            
            // 添加新的音频源
            const source = document.createElement('source');
            source.src = savedMusic;
            source.type = 'audio/mpeg';
            backgroundMusic.appendChild(source);
            
            // 重新加载音频元素
            backgroundMusic.load();
        }
    };
    
    // 加载设置
    loadSettings();
});