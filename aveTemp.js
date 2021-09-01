/**
 * 緯度・経度・月から2020年の平均最低気温・平均最高気温を求めます
 * 気象庁の過去データを加工して作成しています
 * https://www.data.jma.go.jp/gmd/risk/obsdl/index.php
 * 近くの観測地の気温をそのまま返却しているだけなので参考程度に利用してください
 * 
 * 使い方
 * 首里城の1月気温を求める場合
 * console.log(AveTemp.nearTemperature(26.2204565,127.710506,1));
 * 旭川動物園の1月気温を求める場合
 * console.log(AveTemp.nearTemperature(43.767309722222,142.417593333333,1));
 */
class AveTemp{
  static data = [
    {
      name: '下関',
      latitude: 33.94889476,
      longitude: 130.92696080,
      min: [0, 7.4, 6.5, 8.8, 10.4, 16.7, 21, 22.7, 26.7, 21.9, 16.5, 12.7, 6.3],
      max: [0, 12, 12.1, 15.1, 17.1, 23.1, 27.2, 27.5, 32.8, 27.7, 23, 18.6, 11.8]
    },
    {
      name: '京都',
      latitude: 35.01521023,
      longitude: 135.73287115,
      min: [0, 4.3, 3.3, 6.2, 8.1, 15.9, 20.8, 23, 26.4, 22.1, 14.2, 9.4, 3.6],
      max: [0, 11.2, 11.3, 15.8, 18.3, 26.2, 29.4, 29.5, 36.2, 30.1, 22.7, 18.6, 11.9]
    },
    {
      name: '仙台',
      latitude: 38.26219131,
      longitude: 140.89765807,
      min: [0, 0.8, 0.9, 3.5, 6.1, 12.7, 17.8, 19.3, 23.5, 19.8, 12.2, 6.4, 0.5],
      max: [0, 7.5, 8.6, 11.9, 14.6, 22, 25.7, 24.3, 30.9, 26.2, 19.3, 15.6, 7.5]
    },
    {
      name: '佐賀',
      latitude: 33.26658972,
      longitude: 130.30476243,
      min: [0, 5.3, 4.4, 7.3, 8.9, 16.4, 21.5, 22.9, 25.8, 20.9, 14.8, 10.2, 2.9],
      max: [0, 13.1, 13.7, 16.6, 19.3, 26.2, 29.8, 29, 34.5, 29, 24.3, 19.8, 12.3]
    },
    {
      name: '函館',
      latitude: 41.81693300,
      longitude: 140.75336739,
      min: [0, -4.4, -4.2, -0.1, 2.3, 8.7, 14.1, 17.4, 20, 17.1, 8.3, 2.8, -4.4],
      max: [0, 2.3, 2.7, 8.7, 11.2, 17.2, 22.2, 23.7, 27.4, 23.6, 17.4, 10.8, 1.7]
    },
    {
      name: '前橋',
      latitude: 36.39095875,
      longitude: 139.06349979,
      min: [0, 2.1, 2.1, 4.7, 6.9, 14.7, 19.5, 21.2, 24.9, 20.9, 13, 7.8, 1.7],
      max: [0, 11.1, 12, 14.9, 17.7, 25.1, 28.2, 27.4, 35.1, 28.3, 21.3, 17.7, 12.4]
    },
    {
      name: '名古屋',
      latitude: 35.16823043,
      longitude: 136.96479325,
      min: [0, 4.1, 3.1, 6.4, 8.6, 16.1, 21.1, 22.9, 26.5, 22.2, 14.5, 9.8, 3.6],
      max: [0, 11.8, 11.8, 15.9, 19, 25.7, 29.3, 29.1, 35.9, 30, 22.5, 18.9, 12]
    },
    {
      name: '和歌山',
      latitude: 34.22931907,
      longitude: 135.16431390,
      min: [0, 5.4, 4.3, 7.3, 9.3, 16.6, 21.4, 23.7, 26.5, 22.2, 15, 10.5, 5.1],
      max: [0, 12, 12.2, 15.9, 18, 25.2, 28.5, 29.4, 34.5, 29, 22.6, 19.1, 12.4]
    },
    {
      name: '大分',
      latitude: 33.23622780,
      longitude: 131.61966829,
      min: [0, 5.4, 4.5, 7.3, 9.2, 16.1, 20.6, 22.6, 25.8, 21.4, 15.2, 10.3, 3.4],
      max: [0, 12.9, 13.2, 16, 18.8, 24.7, 28.2, 28.7, 34.2, 28.4, 23.3, 19.4, 12.7]
    },
    {
      name: '大阪',
      latitude: 34.68200287,
      longitude: 135.51812254,
      min: [0, 5.8, 4.7, 7.7, 9.7, 16.8, 21.4, 23.4, 27.1, 22.8, 15.1, 10.9, 5.1],
      max: [0, 11.9, 11.9, 15.6, 18.1, 25.7, 29.1, 29.6, 35.7, 30, 22.9, 19, 12.5]
    },
    {
      name: '奈良',
      latitude: 34.67414103,
      longitude: 135.83218400,
      min: [0, 3.5, 2.3, 5.3, 7.3, 14.9, 19.9, 22.4, 25.3, 20.9, 12.9, 8.1, 2.7],
      max: [0, 10.9, 11.3, 15.5, 18.2, 26.1, 29.1, 29.6, 35.8, 29.7, 22.2, 18.7, 11.9]
    },
    {
      name: '宇都宮',
      latitude: 36.55004290,
      longitude: 139.86754136,
      min: [0, 0.3, 0.3, 3.6, 5.8, 14, 18.7, 20.7, 24.1, 20.5, 12.4, 6.4, 0.2],
      max: [0, 10.3, 11.7, 14.9, 17.5, 24.2, 27.3, 26.6, 33.6, 28, 20.7, 17.2, 11]
    },
    {
      name: '室蘭',
      latitude: 42.31156113,
      longitude: 140.97449914,
      min: [0, -2.8, -3.1, 0.3, 2.8, 8.6, 13.8, 16.9, 19.2, 17.2, 10.7, 4.7, -2.4],
      max: [0, 1.6, 1.9, 6.8, 10.5, 16.1, 20.1, 21, 24.9, 22, 16.9, 10.4, 2]
    },
    {
      name: '宮古島',
      latitude: 24.79486235,
      longitude: 125.27812073,
      min: [0, 17.4, 17.3, 18.8, 19.1, 24, 26.6, 27, 26.7, 25.9, 24.1, 22.5, 18.4],
      max: [0, 21.9, 22.5, 23.8, 23.7, 28.6, 31.4, 32.2, 31.2, 30.5, 27.9, 26.1, 22.1]
    },
    {
      name: '宮崎',
      latitude: 31.93862455,
      longitude: 131.41393484,
      min: [0, 5.4, 5.6, 9, 10.3, 17.2, 21.1, 23.1, 25.7, 21.7, 15.5, 11.4, 3.7],
      max: [0, 15.1, 15.6, 17.9, 20.4, 24.8, 28.3, 29.9, 33.7, 28.5, 24.5, 21.3, 14.8]
    },
    {
      name: '富山',
      latitude: 36.70958813,
      longitude: 137.20238017,
      min: [0, 3, 1.6, 3.7, 6.1, 14, 18.9, 21.3, 24.5, 20.8, 12.9, 8.1, 2.6],
      max: [0, 9.8, 10, 13.5, 16.3, 24.3, 27.6, 27.5, 33.9, 29.2, 21.3, 17.4, 9.4]
    },
    {
      name: '山形',
      latitude: 38.25615244,
      longitude: 140.34581753,
      min: [0, -0.6, -1.3, 1.2, 4, 11.8, 17.1, 19.8, 22.6, 18.8, 10, 4.3, -0.6],
      max: [0, 6.2, 7, 11.6, 14.7, 23.5, 27.9, 27.2, 32.7, 27.3, 18.6, 13.7, 5.2]
    },
    {
      name: '岐阜',
      latitude: 35.40056746,
      longitude: 136.76252341,
      min: [0, 3.7, 2.8, 6, 8.2, 15.9, 20.8, 22.9, 26.2, 22.1, 14, 9.4, 3.3],
      max: [0, 11.9, 11.5, 15.6, 18.6, 25.7, 29.4, 29.4, 35.9, 30, 22.8, 19, 12]
    },
    {
      name: '岡山',
      latitude: 34.66084744,
      longitude: 133.91637144,
      min: [0, 2.8, 1.9, 5.2, 7.1, 14.9, 19.9, 22.5, 25.6, 21.1, 13, 7.9, 1.6],
      max: [0, 11.9, 12.3, 16.2, 18.8, 25.8, 28.7, 29.3, 35.6, 30, 23, 18.8, 12.3]
    },
    {
      name: '帯広',
      latitude: 42.92259409,
      longitude: 143.21212046,
      min: [0, -10.8, -10.9, -3.6, 0.5, 7, 12.4, 15.4, 17.3, 13.9, 6, -0.1, -7.9],
      max: [0, -0.2, 0.7, 6.6, 11.4, 19.9, 22.6, 24.5, 28.3, 21.3, 16.9, 9.5, 2.1]
    },
    {
      name: '広島',
      latitude: 34.39915397,
      longitude: 132.46222165,
      min: [0, 4.9, 3.9, 6.6, 8.4, 16.2, 20.8, 23, 26.4, 21.7, 14.9, 9.9, 3.6],
      max: [0, 12.2, 12.7, 16.1, 18.3, 24.9, 28.1, 28.3, 34.5, 29.6, 23.7, 19.1, 12.1]
    },
    {
      name: '彦根',
      latitude: 35.27628167,
      longitude: 136.24365432,
      min: [0, 4.1, 2.4, 5.4, 7.1, 14.3, 19.9, 22.3, 25.7, 21.6, 13.7, 8.7, 3.3],
      max: [0, 10, 9.4, 13.5, 16.5, 23.2, 27.7, 28, 34.2, 28.9, 21.3, 16.8, 9.9]
    },
    {
      name: '徳島',
      latitude: 34.06819490,
      longitude: 134.57368042,
      min: [0, 5.9, 4.6, 7.2, 9.4, 16.6, 20.9, 23.4, 26.3, 22.1, 15.5, 11.2, 5.3],
      max: [0, 12.2, 12.4, 15.6, 18.5, 24.9, 28.1, 29.1, 34.6, 28.9, 22.5, 18.8, 12.4]
    },
    {
      name: '新潟',
      latitude: 37.89539956,
      longitude: 139.01827307,
      min: [0, 2.4, 1.5, 3.7, 6, 13.2, 18.6, 21.3, 24.3, 21.1, 12.6, 7.5, 2.6],
      max: [0, 8.2, 8.7, 12.2, 14.6, 22.1, 26.6, 26.8, 31.5, 28.6, 20.6, 15.4, 8.5]
    },
    {
      name: '旭川',
      latitude: 43.75789426,
      longitude: 142.37231610,
      min: [0, -11.7, -11, -4.1, 0, 7, 13.2, 16.5, 17.2, 14.2, 6.1, 0.7, -7.3],
      max: [0, -3, -1.3, 5.5, 10.1, 19, 22.4, 27.1, 28.1, 23.5, 15.3, 7.4, -1.8]
    },
    {
      name: '札幌',
      latitude: 43.06046389,
      longitude: 141.32887821,
      min: [0, -5.3, -5.2, 0, 3.1, 9.4, 14.8, 18.2, 19.6, 17, 9.4, 3, -4.3],
      max: [0, 0.4, 0.8, 6.8, 11.1, 18.9, 22.6, 25.7, 28.1, 24, 17.1, 9.6, 1.3]
    },
    {
      name: '東京',
      latitude: 35.77644547,
      longitude: 139.53207132,
      min: [0, 3.7, 4, 6.2, 7.9, 15.6, 19.8, 21.8, 25.3, 21.5, 14.4, 10.1, 3.7],
      max: [0, 11.1, 13.3, 16, 18.2, 24, 27.5, 27.7, 34.1, 28.1, 21.4, 18.6, 12.3]
    },
    {
      name: '松山',
      latitude: 33.84369845,
      longitude: 132.77759313,
      min: [0, 5.4, 4.6, 7.1, 8.6, 16, 20.7, 22.8, 25.9, 21.9, 14.9, 10.4, 4.2],
      max: [0, 12.7, 12.7, 15.9, 18, 24.7, 28.4, 29.4, 34.5, 29.7, 23.5, 19.5, 12.5]
    },
    {
      name: '松江',
      latitude: 35.45817738,
      longitude: 133.06543741,
      min: [0, 4.3, 2.1, 5.1, 6.9, 14.5, 19.5, 21.7, 25.4, 20.4, 13.2, 9, 3.5],
      max: [0, 11, 11.2, 14.6, 16.5, 23.4, 27.4, 27.4, 34, 27.7, 21.8, 17.8, 10.8]
    },
    {
      name: '横浜',
      latitude: 35.44005779,
      longitude: 139.65359932,
      min: [0, 4.7, 5.2, 7.1, 9.3, 16.5, 20.5, 22.1, 25.9, 22.2, 15.3, 11.4, 5.3],
      max: [0, 11.3, 13, 15.7, 18.1, 23.8, 27.3, 27.6, 33.7, 28.1, 21.6, 18.5, 12.5]
    },
    {
      name: '水戸',
      latitude: 36.38151753,
      longitude: 140.46828462,
      min: [0, 0.9, 0.8, 3.7, 6.1, 14.1, 18.6, 20.3, 23.7, 20.5, 12.6, 6.7, 0.2],
      max: [0, 10.7, 12.1, 15, 16.8, 23.5, 26.3, 26.5, 32.2, 27.6, 20.6, 17.7, 11.3]
    },
    {
      name: '津',
      latitude: 34.73440382,
      longitude: 136.51988059,
      min: [0, 5.3, 3.8, 6.7, 9.1, 16.5, 21.1, 23.1, 26.6, 22.3, 15, 10.3, 4.8],
      max: [0, 11.9, 11.7, 14.6, 17.8, 24.1, 27.9, 28, 33.6, 28.4, 22.1, 18.1, 12.6]
    },
    {
      name: '熊本',
      latitude: 32.78675739,
      longitude: 130.68877433,
      min: [0, 4.7, 3.9, 7.2, 8.7, 16.7, 21.4, 23, 25.6, 20.8, 14.4, 9.6, 1.8],
      max: [0, 13.4, 14.2, 17.2, 19.5, 26.7, 29.4, 29.6, 35.2, 29.5, 25.1, 19.9, 12.6]
    },
    {
      name: '熊谷',
      latitude: 36.15035908,
      longitude: 139.38066086,
      min: [0, 1.9, 2, 5, 7.4, 14.8, 19.7, 21.3, 25.2, 21.1, 13.8, 7.7, 1.2],
      max: [0, 11.5, 12.7, 15.8, 18.4, 25.4, 28.5, 27.6, 35.6, 28.6, 21.4, 18.1, 12.7]
    },
    {
      name: '甲府',
      latitude: 35.66748650,
      longitude: 138.55401913,
      min: [0, 0.8, 0.5, 4.7, 6.8, 14.7, 19.5, 21.7, 24.7, 21, 12.6, 6.6, 0.2],
      max: [0, 11, 12.7, 16.6, 19.5, 26.3, 29.1, 29.1, 35.8, 29.5, 21.4, 18.3, 12.4]
    },
    {
      name: '盛岡',
      latitude: 39.69875914,
      longitude: 141.16582166,
      min: [0, -3.3, -2.7, 0, 2.4, 10.3, 15.4, 18.8, 21.4, 17.3, 8.5, 2.3, -3.3],
      max: [0, 4, 4.9, 10, 12.2, 20.8, 26, 25.5, 30.4, 25.8, 17.7, 11.7, 3.8]
    },
    {
      name: '石垣島',
      latitude: 24.33694597,
      longitude: 124.16456066,
      min: [0, 17.8, 18, 19.5, 19.8, 24.8, 27.9, 28.4, 27.2, 26.5, 23.8, 22.6, 18.6],
      max: [0, 22.7, 23.4, 24.7, 24.8, 29.3, 32.1, 32.9, 31.9, 31.3, 29.4, 27, 22.6]
    },
    {
      name: '神戸',
      latitude: 34.69749022,
      longitude: 135.21281765,
      min: [0, 6.2, 5.1, 8, 10.2, 17.3, 21.6, 23.6, 27.4, 23.4, 16.1, 11.5, 5.6],
      max: [0, 11.8, 11.7, 15.1, 17.3, 24.4, 27.7, 28.5, 34, 29.2, 22.7, 18.4, 12.4]
    },
    {
      name: '福井',
      latitude: 36.05565662,
      longitude: 136.22266869,
      min: [0, 3.4, 2.2, 4.1, 6.3, 14.2, 19.6, 22, 24.9, 21, 12.6, 7.9, 3.1],
      max: [0, 10, 10.4, 14.1, 16.8, 24.3, 28.4, 28.5, 34, 29.4, 21.9, 17.8, 9.7]
    },
    {
      name: '福岡',
      latitude: 33.58241598,
      longitude: 130.37642566,
      min: [0, 6.8, 6.1, 8.7, 10.4, 16.9, 21.8, 23.2, 27, 21.4, 15.8, 11.7, 5.2],
      max: [0, 12.7, 13.8, 16.5, 18.4, 24.7, 29.2, 28.9, 34.5, 28.4, 23.6, 19.5, 12.3]
    },
    {
      name: '福島',
      latitude: 37.75848638,
      longitude: 140.47069207,
      min: [0, 0.5, 0.6, 3.1, 6, 12.9, 17.9, 20.1, 23.8, 19.6, 11.5, 5.8, 0.3],
      max: [0, 8, 9.4, 12.9, 16.3, 23.9, 27.8, 26.6, 33.6, 26.9, 19.4, 15.8, 7.8]
    },
    {
      name: '秋田',
      latitude: 39.71788273,
      longitude: 140.09955872,
      min: [0, -0.3, -0.8, 2.2, 4.7, 11.4, 17.1, 20.3, 22.8, 19.3, 10.9, 5.4, -0.4],
      max: [0, 5.2, 6.1, 10.9, 13, 19.8, 25.2, 26.3, 30.3, 27.5, 18.7, 12.9, 5.1]
    },
    {
      name: '稚内',
      latitude: 45.41544169,
      longitude: 141.67830069,
      min: [0, -6.1, -6.5, -1.4, 1.4, 7.2, 11.7, 15.5, 16.9, 16.3, 9.1, 2.4, -4.8],
      max: [0, -1.8, -2.2, 3.5, 7.4, 13.1, 16.9, 20.6, 22.4, 21.4, 14.8, 6.8, -1.4]
    },
    {
      name: '網走',
      latitude: 44.01812901,
      longitude: 144.27963348,
      min: [0, -7.8, -9.6, -3.1, 0.4, 6.1, 12.1, 15.4, 17.1, 14.8, 8.4, 1.5, -6.9],
      max: [0, -1.6, -2.3, 4.4, 8.3, 15.8, 19.4, 21.4, 25.1, 22.2, 16, 8, -0.8]
    },
    {
      name: '那覇',
      latitude: 26.20747144,
      longitude: 127.68657822,
      min: [0, 16.3, 16.1, 17.5, 17.5, 22.6, 26.1, 26.9, 27.3, 25.7, 23.8, 21.7, 17.2],
      max: [0, 21.4, 21.9, 22.9, 22.5, 27.6, 30.8, 32.1, 32.2, 30.3, 28.6, 25.8, 21.3]
    },
    {
      name: '金沢',
      latitude: 36.58907068,
      longitude: 136.63418005,
      min: [0, 3.9, 2.8, 4.9, 7.4, 14.6, 19.9, 22.1, 25.7, 21.6, 13.8, 8.7, 3.9],
      max: [0, 9.8, 10.5, 13.4, 15.6, 23.1, 27.6, 27.7, 32.9, 29.2, 21.7, 17.7, 10.6]
    },
    {
      name: '釧路',
      latitude: 42.98670372,
      longitude: 144.37994109,
      min: [0, -8.9, -8.8, -2.1, 0.3, 5.9, 11.4, 14.3, 16.4, 14.1, 7.7, 1.4, -7.8],
      max: [0, 0.3, 0.1, 5.1, 8, 13.7, 18, 19.4, 23.6, 20.6, 16.3, 9.8, 2.2]
    },
    {
      name: '銚子',
      latitude: 35.73985123,
      longitude: 140.85782347,
      min: [0, 5.4, 5.5, 7.6, 9.3, 16.4, 19.5, 20.3, 24.4, 22.6, 16.1, 12.1, 5.9],
      max: [0, 11.8, 12.5, 14.5, 16.8, 21.8, 24.4, 24.9, 30.1, 26.9, 21.1, 18, 12.3]
    },
    {
      name: '長崎',
      latitude: 32.73364219,
      longitude: 129.86811222,
      min: [0, 6.8, 6.1, 8.5, 9.9, 16.8, 21.3, 23.2, 25.9, 21.3, 15.9, 11.5, 4.7],
      max: [0, 13.3, 14, 16.2, 18.3, 24.5, 27.5, 28.4, 32.8, 28.1, 24.1, 19.5, 12.6]
    },
    {
      name: '長野',
      latitude: 36.66271113,
      longitude: 138.19268733,
      min: [0, -0.6, -2.1, 0.7, 2.9, 12, 17.5, 20.1, 22.8, 19.5, 9.6, 3.8, -1.8],
      max: [0, 7.2, 8.1, 12.4, 15.7, 25, 27.6, 27.1, 33.5, 27.8, 18.4, 15.1, 6.9]
    },
    {
      name: '青森',
      latitude: 40.82191337,
      longitude: 140.76841038,
      min: [0, -1.7, -1.7, 1.2, 3.5, 10.1, 15.6, 18.3, 21.9, 17.8, 9.7, 4, -1.6],
      max: [0, 3.8, 4.5, 9.9, 12.5, 19.3, 24.2, 25.3, 29.5, 25.8, 18.2, 12.2, 3.3]
    },
    {
      name: '静岡',
      latitude: 34.97616767,
      longitude: 138.40365445,
      min: [0, 5.2, 4.6, 7.3, 9.7, 16.5, 20.6, 22.8, 25.7, 22.6, 15.7, 11.1, 4.8],
      max: [0, 13.9, 14.5, 17.2, 19.7, 24.4, 28.1, 28.4, 33.4, 29.9, 23.1, 20.5, 14.6]
    },
    {
      name: '高松',
      latitude: 34.35235580,
      longitude: 134.04578995,
      min: [0, 5, 3.1, 6.4, 8.5, 16.1, 21.2, 23.4, 26.7, 22.4, 14.8, 10, 4.1],
      max: [0, 11.8, 12.2, 15.9, 18.4, 25.5, 29, 29.4, 35.5, 29.7, 22.7, 18.6, 12.2]
    },
    {
      name: '高知',
      latitude: 33.55697859,
      longitude: 133.53372587,
      min: [0, 5, 4.2, 7.5, 9.2, 16.4, 20.6, 23.2, 25.5, 21.7, 15.2, 10.7, 3.9],
      max: [0, 14.4, 14.5, 17.3, 19.7, 25.2, 28.1, 29.1, 34, 29.4, 24.8, 21, 14.7]
    },
    {
      name: '鳥取',
      latitude: 35.48789747,
      longitude: 134.23810548,
      min: [0, 3.9, 2.3, 4.5, 6.4, 14, 18.7, 21.7, 25, 20.2, 12.7, 8.4, 2.8],
      max: [0, 11.4, 11.2, 15.1, 17.1, 24.1, 28.5, 28.4, 35, 29, 21.8, 18.1, 10.6]
    },
    {
      name: '鹿児島',
      latitude: 31.55439345,
      longitude: 130.54858949,
      min: [0, 7.5, 7, 10.1, 11.1, 18.4, 22.3, 24.2, 26.7, 22.5, 17.4, 13.2, 6.1],
      max: [0, 15.6, 16.2, 18.5, 21.1, 26.2, 28.5, 30.4, 34.2, 29.1, 26, 21.7, 15.2]
    }
  ];


  static getDistanceMeter(lat1 = 35.65859206, lon1 = 139.74544113, lat2 = 34.681969378519, lon2 = 135.52660014305) {
    lat1 = lat1 * Math.PI / 180;
    lon1 = lon1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    return Math.ceil(6371000 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1) + Math.sin(lat1) * Math.sin(lat2)));
  }

  
  static nearTemperature(latitude = 35.65859206, longitude = 139.74544113, month = 12){
    let res = this.data[0], distance = this.getDistanceMeter(latitude, longitude, this.data[0].latitude, this.data[0].longitude);
    for (let tmp of this.data) {
      const d = this.getDistanceMeter(latitude, longitude, tmp.latitude, tmp.longitude);
      if (d < distance) {
        distance = d;
        res = tmp;
      }
    }
    return {
      min: res.min[month],
      max: res.max[month],
      message: `気象庁の過去データを加工して作成したデータです。${res.name}・${month}月・平均最小・平均最大気温`
    };
  }
};
