const dataset = [10, 20, 30, 40, 50];

d3.select("svg") // 그림을 그릴 svg캔버스 불러오기
  .selectAll("text") // 앞으로 생성할 여러가지 text요소 준비
  .data(dataset) // 텍스트요소에 데이터 매핑
  .enter() // 모든 준비 완료되었음을 명시
  .append("text") // 준비된 요소를 text형태로 svg안에 추가
  .text((d) => d * 2) // 기존 배열 데이터를 기준으로 값을 조작
  .attr("x", 10) // 가로축(x축)기준으로 10px이동하여 출력
  .attr("y", (d, i) => i * 25 + 20) // 가로축(y축) 위치값 설정
  .attr("font-size", "15px")
  .attr("fill", "green");

// 글자의 크기를 15px로 변경, 색상은 초록색
// 텍스트당 세로 위치값을 20px단위로 아래로 배치
