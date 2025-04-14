const dataset = [100, 200, 300, 400, 500];

const bgColors = ["red", "green", "blue", "pink", "aqua"];

const fiveSvg = document.querySelector("svg.five");
fiveSvg.style.width = `550px`;
fiveSvg.style.height = `${30 * dataset.length}px`;

d3.select("svg.first") // 그림을 그릴 svg캔버스 불러오기
  .selectAll("text") // 앞으로 생성할 여러가지 text요소 준비
  .data(dataset) // 텍스트요소에 데이터 매핑
  .enter() // 모든 준비 완료되었음을 명시
  .append("text") // 준비된 요소를 text형태로 svg안에 추가
  .text((d) => d * 2) // 기존 배열 데이터를 기준으로 값을 조작
  .attr("x", 10) // 가로축(x축)기준으로 10px이동하여 출력
  .attr("y", (d, i) => i * 40 + 25) // 세로축(y축) 위치값 설정 (+n: 초기 세로 위치값으로 뷰포트 기준으로 n만큼 간격. 40: 각 요소간 간격)
  .attr("font-size", "15px")
  .attr("fill", "green");

// 글자의 크기를 15px로 변경, 색상은 초록색
// 텍스트당 세로 위치값을 20px단위로 아래로 배치

// 응용예제 (가로 배치 예제)
// 5개의 배열요소가 세로축으로는 모두 50px에 위치하도록 처리

d3.select("svg.second") // 그림을 그릴 svg캔버스 불러오기
  .selectAll("text") // 앞으로 생성할 여러가지 text요소 준비
  .data(dataset) // 텍스트요소에 데이터 매핑
  .enter() // 모든 준비 완료되었음을 명시
  .append("text") // 준비된 요소를 text형태로 svg안에 추가
  .text((d) => d) // 기존 배열 데이터를 기준으로 값을 조작
  .attr("x", (d, i) => i * 40 + 10) // 가로축(x축) 위치값 설정
  .attr("y", 20) // 세로축(y축) 위치값 설정
  .attr("font-size", "15px")
  .attr("fill", "green");

/**
 * 데이터 입력시 text요소는 y축을 기준으로 위쪽에 글이 배치됨
 * 반면 rect와 같은 box요소는 y축을 기준으로 아래쪽에 배치됨
 */

// 가로 bar형태의 차트
d3.select("svg.third")
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .text((d) => d)
  .attr("x", 0)
  .attr("y", (d, i) => i * 30 + 0)
  .attr("width", (d) => d)
  .attr("height", 25)
  .attr("fill", "green");

// 세로bar
const chartH = 600;
d3.select("svg.fourth")
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .text((d) => d)
  .attr("x", (d, i) => i * 30 + 0)
  .attr("y", (d, i) => chartH - d - 10) // bar를 하단에 배치, 10만큼의 간격
  .attr("width", 25)
  .attr("height", (d) => d)
  .attr("fill", "orange");

// 가로 bar형태의 차트 옆에 값 출력
d3.select("svg.five")
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .text((d) => d)
  .attr("x", 0)
  .attr("y", (d, i) => i * 30 + 0)
  .attr("width", (d) => d)
  .attr("height", 25)
  .attr("fill", (_, i) => bgColors[i]); // 컬러 동적으로 변경

// svg안쪽에 text요소 추가 출력
d3.select("svg.five")
  .selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text((d) => d)
  .attr("x", (d) => d + 10)
  .attr("y", (d, i) => i * 30 + 10 + 10)
  .attr("width", (d) => d)
  .attr("height", 25)
  .attr("font-size", "20px")
  .attr("fill", "black");

// ******************************* //
// 반응형으로 chart출력

const datasetResponsive = [100, 150, 80, 180, 120];
const svgWidth = 500;
const svgHeight = 300;

const svgResponsiveEl = d3.select("svg.responsive");

// xPercent에 대입되는 값은 백분율화 해주는 함수
const xPercent = d3
  .scaleLinear() // 비율화 준비
  .domain([0, d3.max(datasetResponsive)]) // 데이터를 비율화
  .range([0, svgWidth - 40]); // 데이터가 출력될 프레임을 비율화

svgResponsiveEl
  .selectAll("rect")
  .data(datasetResponsive)
  .enter()
  .append("rect")
  .attr("x", 0)
  .attr("y", (d, i) => i * 25 + 10)
  .attr("width", (d) => xPercent(d)) // xPercent함수를 이용하여 각 수치값을 전달시 자동으로 제일 큰 수치값을 기준으로 백분율화
  .attr("height", 20)
  .attr("fill", "pink");

/**
 * 미션1: 프레임쪽에서 글자까지 들어간 상태로 백분율화
 * 미션2: 차트를 오른쪽 정렬 형식으로 출력
 * 미션3: 차트를 세로형식으로 아래에서 위로 그려지도록 출력
 */

// 미션1
svgResponsiveEl
  .selectAll("text")
  .data(datasetResponsive)
  .enter()
  .append("text")
  .text((d) => d)
  .attr("x", (d) => xPercent(d) + 10)
  .attr("y", (d, i) => i * 25 + 30)
  .attr("width", (d) => d)
  .attr("height", 25)
  .attr("font-size", "20px")
  .attr("fill", "black");

// 미션2
const svgResponsiveRightEl = d3.select("svg.responsive-right");

svgResponsiveRightEl
  .selectAll("rect")
  .data(datasetResponsive)
  .enter()
  .append("rect")
  .attr("x", (d) => svgWidth - xPercent(d)) // 오른쪽 정렬
  .attr("y", (d, i) => i * 25 + 10)
  .attr("width", (d) => xPercent(d))
  .attr("height", 20)
  .attr("fill", "blue");

svgResponsiveRightEl
  .selectAll("text")
  .data(datasetResponsive)
  .enter()
  .append("text")
  .text((d) => d)
  .attr("x", (d) => svgWidth - xPercent(d) - 40) // 글자 크기를 포함함 간격
  .attr("y", (d, i) => i * 25 + 30)
  .attr("width", (d) => d)
  .attr("height", 25)
  .attr("font-size", "20px")
  .attr("fill", "black");

// 미션3
const svgResponsiveVerticalEl = d3.select("svg.responsive-vertical");

const yPercent = d3
  .scaleLinear() // 비율화 준비
  .domain([0, d3.max(datasetResponsive)]) // 데이터를 비율화
  .range([0, svgHeight - 40]); // 데이터가 출력될 프레임을 비율화

svgResponsiveVerticalEl
  .selectAll("rect")
  .data(datasetResponsive)
  .enter()
  .append("rect")
  .attr("x", (_, i) => i * 25 + 10)
  .attr("y", (d, i) => svgHeight - yPercent(d))
  .attr("width", 20)
  .attr("height", (d) => yPercent(d))
  .attr("fill", "aqua");

svgResponsiveVerticalEl
  .selectAll("text")
  .data(datasetResponsive)
  .enter()
  .append("text")
  .text((d) => d)
  .attr("x", (d, i) => i * 25 + 5)
  .attr("y", (d, i) => svgHeight - yPercent(d) - 10)
  .attr("width", (d) => d)
  .attr("height", 25)
  .attr("font-size", "20px")
  .attr("fill", "black");
