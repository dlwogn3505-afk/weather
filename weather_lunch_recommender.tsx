import React, { useState } from 'react';
import { Cloud, Sun, CloudRain, Snowflake, Wind, CloudDrizzle, Utensils, RefreshCw } from 'lucide-react';

export default function WeatherLunchRecommender() {
  const [selectedWeather, setSelectedWeather] = useState('');
  const [temperature, setTemperature] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const weatherOptions = [
    { id: 'sunny', label: '맑음', icon: Sun, color: 'from-yellow-400 to-orange-400', emoji: '☀️' },
    { id: 'cloudy', label: '흐림', icon: Cloud, color: 'from-gray-400 to-gray-500', emoji: '☁️' },
    { id: 'rainy', label: '비', icon: CloudRain, color: 'from-blue-400 to-blue-600', emoji: '🌧️' },
    { id: 'snowy', label: '눈', icon: Snowflake, color: 'from-blue-200 to-blue-300', emoji: '❄️' },
    { id: 'windy', label: '바람', icon: Wind, color: 'from-teal-400 to-cyan-500', emoji: '💨' },
    { id: 'drizzle', label: '안개/이슬비', icon: CloudDrizzle, color: 'from-slate-400 to-slate-500', emoji: '🌫️' }
  ];

  const menuDatabase = {
    sunny: {
      hot: ['냉면', '냉국수', '샐러드', '회덮밥', '냉파스타', '쌀국수', '월남쌈', '초밥'],
      warm: ['비빔밥', '김밥', '샌드위치', '연어덮밥', '포케', '타코', '부리토'],
      cold: ['삼겹살', '곱창', '불고기', '갈비', '제육볶음', '닭갈비'],
      description: '맑은 날씨에는 상큼하고 가벼운 메뉴가 좋아요!'
    },
    cloudy: {
      hot: ['냉우동', '비빔국수', '물냉면', '샐러드', '냉모밀'],
      warm: ['돈까스', '우동', '라멘', '짜장면', '짬뽕', '볶음밥', '오므라이스', '카레'],
      cold: ['국밥', '설렁탕', '감자탕', '부대찌개', '순두부찌개'],
      description: '흐린 날씨엔 든든한 한 끼가 딱이에요!'
    },
    rainy: {
      hot: ['냉우동', '물냉면', '냉국수'],
      warm: ['파전', '김치전', '부침개', '라면', '떡볶이', '튀김', '만두'],
      cold: ['칼국수', '수제비', '해물탕', '김치찌개', '된장찌개', '부대찌개', '순두부', '국밥'],
      description: '비 오는 날엔 따뜻한 국물 요리가 최고!'
    },
    snowy: {
      hot: ['냉면 (역발상!)'],
      warm: ['떡볶이', '어묵', '붕어빵', '호떡'],
      cold: ['김치찌개', '부대찌개', '해물탕', '전골', '샤브샤브', '곱창전골', '국밥', '설렁탕', '육개장'],
      description: '눈 오는 날엔 뜨끈한 국물로 몸을 녹여요!'
    },
    windy: {
      hot: ['냉면', '막국수', '비빔국수'],
      warm: ['햄버거', '샌드위치', '김밥', '주먹밥', '도시락'],
      cold: ['찌개', '국밥', '칼국수', '수제비'],
      description: '바람 부는 날엔 간편하게 먹을 수 있는 메뉴!'
    },
    drizzle: {
      hot: ['냉우동', '냉국수'],
      warm: ['파스타', '리조또', '필라프', '볶음밥', '비빔밥'],
      cold: ['우동', '라멘', '쌀국수', '순두부찌개', '김치찌개'],
      description: '촉촉한 날씨엔 부드러운 요리가 어울려요!'
    }
  };

  const getRecommendation = () => {
    if (!selectedWeather) {
      alert('날씨를 선택해주세요!');
      return;
    }
    if (!temperature) {
      alert('기온을 입력해주세요!');
      return;
    }

    setIsAnimating(true);

    setTimeout(() => {
      const temp = parseInt(temperature);
      const menus = menuDatabase[selectedWeather];
      let category;
      let tempDescription;

      if (temp >= 28) {
        category = 'hot';
        tempDescription = '더운 날씨';
      } else if (temp >= 15) {
        category = 'warm';
        tempDescription = '선선한 날씨';
      } else {
        category = 'cold';
        tempDescription = '추운 날씨';
      }

      const availableMenus = menus[category];
      const randomIndex = Math.floor(Math.random() * availableMenus.length);
      const selectedMenu = availableMenus[randomIndex];

      // 추가 메뉴 2개 더 추천
      const otherMenus = availableMenus.filter((_, idx) => idx !== randomIndex);
      const shuffled = otherMenus.sort(() => Math.random() - 0.5);
      const alternatives = shuffled.slice(0, 2);

      setRecommendation({
        menu: selectedMenu,
        alternatives,
        weather: weatherOptions.find(w => w.id === selectedWeather),
        temperature: temp,
        tempDescription,
        description: menus.description
      });

      setIsAnimating(false);
    }, 1500);
  };

  const reset = () => {
    setSelectedWeather('');
    setTemperature('');
    setRecommendation(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 p-4 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Utensils className="text-orange-600 w-10 h-10 mr-3" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              오늘 뭐 먹지?
            </h1>
          </div>
          <p className="text-gray-700 text-lg">날씨와 기온에 맞는 완벽한 점심메뉴를 추천해드려요!</p>
        </div>

        {!recommendation ? (
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            {/* 날씨 선택 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🌤️</span>
                오늘 날씨는?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {weatherOptions.map((weather) => {
                  const Icon = weather.icon;
                  return (
                    <button
                      key={weather.id}
                      onClick={() => setSelectedWeather(weather.id)}
                      className={`p-4 rounded-2xl border-3 transition-all transform hover:scale-105 ${
                        selectedWeather === weather.id
                          ? `bg-gradient-to-r ${weather.color} text-white border-transparent shadow-lg scale-105`
                          : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${selectedWeather === weather.id ? 'text-white' : 'text-gray-600'}`} />
                      <div className="text-lg font-bold">{weather.label}</div>
                      <div className="text-2xl mt-1">{weather.emoji}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 기온 입력 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🌡️</span>
                현재 기온은?
              </h2>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  placeholder="예: 23"
                  className="flex-1 px-6 py-4 text-2xl text-center border-3 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-400 transition-all"
                  min="-20"
                  max="45"
                />
                <span className="text-3xl font-bold text-gray-700">°C</span>
              </div>
              <div className="mt-3 text-sm text-gray-500 text-center">
                {temperature && (
                  <span>
                    {parseInt(temperature) >= 28 && '🥵 더워요! 시원한 메뉴 추천할게요'}
                    {parseInt(temperature) >= 15 && parseInt(temperature) < 28 && '😊 딱 좋은 날씨네요!'}
                    {parseInt(temperature) < 15 && '🥶 추워요! 따뜻한 메뉴 추천할게요'}
                  </span>
                )}
              </div>
            </div>

            {/* 추천 버튼 */}
            <button
              onClick={getRecommendation}
              disabled={isAnimating}
              className="w-full py-5 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xl font-bold rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isAnimating ? (
                <span className="flex items-center justify-center">
                  <RefreshCw className="animate-spin mr-2" />
                  메뉴 고르는 중...
                </span>
              ) : (
                '🍴 메뉴 추천받기'
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            {/* 메인 추천 */}
            <div className={`bg-gradient-to-r ${recommendation.weather.color} rounded-3xl p-8 shadow-2xl text-white`}>
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{recommendation.weather.emoji}</div>
                <div className="text-xl mb-2 opacity-90">
                  {recommendation.weather.label} · {recommendation.temperature}°C · {recommendation.tempDescription}
                </div>
                <div className="text-lg opacity-80">{recommendation.description}</div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 text-center">
                <div className="text-sm font-semibold mb-2 opacity-90">오늘의 추천 메뉴는</div>
                <div className="text-6xl font-bold mb-4">
                  {recommendation.menu}
                </div>
                <div className="text-4xl">🍽️</div>
              </div>
            </div>

            {/* 대안 메뉴 */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">💡</span>
                다른 선택지도 있어요!
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {recommendation.alternatives.map((menu, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-gray-800">{menu}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 다시 하기 버튼 */}
            <button
              onClick={reset}
              className="w-full py-4 bg-white text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all shadow-lg flex items-center justify-center"
            >
              <RefreshCw className="mr-2 w-5 h-5" />
              다시 추천받기
            </button>
          </div>
        )}

        {/* 푸터 */}
        <div className="text-center mt-6 text-gray-600 text-sm">
          <p>매일 고민되는 점심메뉴, 이제 날씨가 정해드려요! 🌟</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}