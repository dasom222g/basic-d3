const dataset = [600, 150, 80, 180, 120, 400, 280];

// 파이차트 렌더링 함수
const renderPie = ({ innerRadius = 0, interval = 0, speed = 1000 } = {}) => {
  /**
   * Args
   * innerRadius: 도넛차트의 중앙 원형사이즈
   * interval: 각 차트별 모션 딜레이 간격
   * speed: 도넛차트 애니메이션 duration
   */

  const svg = d3.select("svg.pie");
  const width = svg.node().getBoundingClientRect().width;
  const outerRadius = (width * 0.7) / 2; // SVG 폭의 70% 크기로 outerRadius 설정
  const height = outerRadius * 2 + 50; // outerRadius 기반으로 높이값 재설정, 50은 약간의 여유 여백
  const centerX = width / 2;
  const centerY = height / 2;

  // svg 프레임의 높이를 다시 설정
  svg.attr("height", height);

  svg.selectAll("*").remove(); // 초기화

  const pie = d3.pie();
  const pieData = pie(dataset);
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const color = d3.scaleOrdinal(d3.schemeSet3);

  svg
    .selectAll("path")
    .data(pieData)
    .enter()
    .append("path")
    .attr("d", arc) // 데이터
    .attr("fill", (d, i) => color(i))
    .attr("transform", `translate(${centerX}, ${centerY})`)
    .attr("opacity", 0)
    .transition()
    .delay((d, i) => i * interval)
    .duration(speed)
    .attr("opacity", 1);

  svg
    .selectAll("text")
    .data(pieData)
    .enter()
    .append("text")
    .text((d) => d.data)
    .attr("transform", (d) => {
      const [x, y] = arc.centroid(d);
      return `translate(${centerX + x}, ${centerY + y})`;
    })
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .style("font-size", "14px")
    .style("fill", "black")
    .attr("opacity", 0)
    .transition()
    .delay((d, i) => i * interval + speed / 2)
    .duration(speed)
    .attr("opacity", 1);
};

// 이벤트 바인딩
renderPie({ interval: 100, innerRadius: 50 });
window.addEventListener("resize", () =>
  renderPie({ innerRadius: 50, speed: 0 })
);
