# Happy Path Test

## 정의

---

"Happy Path"는 소프트웨어 테스트에서 특정 기능 또는 시나리오가 예상대로 잘 작동하는 최상의 조건을 의미합니다. 이는 보통 기능테스트의 하위항목이라고 볼 수 있으며 정상적인 상황에서 사용자가 예상한 결과를 얻는 것을 의미합니다.

예를 들어, 웹 사이트의 로그인 기능을 테스트한다고 가정해보겠습니다. Happy Path 테스트는 유효한 사용자 이름과 비밀번호를 입력하여 로그인하는 경우를 가정합니다. 이 경우에는 올바른 자격 증명을 제공하므로 예상대로 로그인이 성공해야 합니다.

Happy Path 테스트는 일반적인 시나리오를 테스트하는 데 중점을 두며, 특히 시스템 또는 기능이 오류 없이 예상대로 작동하는 경우에 초점을 맞춥니다. 그러나 실제 사용 환경에서는 항상 예상되는 대로만 작동하지 않을 수 있으므로 다양한 상황에 대비하여 추가적인 테스트도 필요합니다. 이를 통해 시스템의 안정성과 견고성을 보다 효과적으로 확인할 수 있습니다.

## 적용

---

실제 코드에서 적용한 예시입니다.

```jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";
import { expect } from "vitest";

test("order phases for happy path", async () => {
  const user = userEvent.setup();

  // render app
  const { unmount } = render(<App />);

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");

  const cherriesCheckBox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckBox);

  // find and click order button
  const orderSummaryButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  await user.click(orderSummaryButton);

  // check summary information based on order
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $4.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingHeading).toBeInTheDocument();

  // alternatively...
  // const optionItems = screen.getAllByRole("listitem");
  // const optionItemsText = optionItems.map((item)=> item.textContent)
  // expect(optionItemsText).toEqual(["2 Vanilla", "Cherries"]);

  // accept terms and conditions and click to confirm order
  const termsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(termsCheckbox);
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  await user.click(confirmButton);

  // loading test
  const loding = screen.getByText("Loading");
  expect(loding).toBeInTheDocument();

  // post가 완료되어 로딩이 끝나고 메세지가 나타나는지 테스트
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  // 로딩이 끝난지 테스트
  const notLoading = screen.queryByText("loading");
  expect(notLoading).not.toBeInTheDocument();

  // confirm order number on confirmation page
  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // click new order button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: /create new order/i,
  });
  await user.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsTotal = await screen.findByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingTotal = await screen.findByText("Toppings total: $0.00");
  expect(toppingTotal).toBeInTheDocument();

  // do we need to await anything to avoid test errors?
  unmount();
});
```

1. **앱 렌더링 및 아이스크림 주문 단계 설정**
    - <APP />을 렌더링하고, 아이스크림 스쿱과 토핑을 주문하는 초기 단계입니다.
    - "Vanilla" 스쿱을 2개 주문하고, "Cherries" 토핑을 선택합니다.
2. **주문 요약 및 확인**
    - "Order Sundae" 버튼을 찾아 클릭하여 주문 요약 페이지로 이동합니다.
    - 주문 요약 정보를 확인합니다.
    - "Order Summary" 헤딩과 스쿱 및 토핑의 가격 정보를 확인합니다.
3. **약관 동의 및 주문 확정**
    - "Terms and Conditions" 체크박스를 찾아 동의하고, "Confirm Order" 버튼을 클릭하여 주문을 확정합니다.
    - "Loading" 텍스트가 나타나는지 확인하여 주문이 처리되는 동안 로딩 상태를 확인합니다.
4. **주문 완료 및 초기화**
    - 주문이 처리되어 "Thank You" 헤딩이 나타나는지 확인합니다.
    - 로딩이 완료되었는지 확인하고, "Order Number" 텍스트가 나타나는지 확인합니다.
    - "Create New Order" 버튼을 클릭하여 주문을 초기화합니다.
    - 스쿱과 토핑의 가격이 0.00 달러로 초기화되었는지 확인합니다.
    

위의 단계들은 테스트를 통해 특정 사용자 시나리오가 예상한 대로 작동하는지 확인하는 것을 목적으로 합니다. 각 단계에서 UI 요소의 유무, 적절한 텍스트가 나타나는지, 주문 과정이 정확히 처리되는지 등을 검증하여 시나리오대로 잘 동작하는지 테스트 합니다.