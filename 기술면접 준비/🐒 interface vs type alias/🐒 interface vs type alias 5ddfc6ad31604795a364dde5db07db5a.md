# 🐒 interface vs type alias

**`interface`**와 **`type alias`**는 TypeScript에서 타입을 선언하는 두 가지 주요 방법입니다. 각각의 특징과 사용 시 고려 사항입니다.

### 1. **확장(Extensibility) :**

- **type:** 확장이 불가능합니다. 동일한 이름으로 여러 번 선언하면 에러가 발생합니다.
- **interface:** 확장이 가능합니다. 같은 이름의 interface를 선언하면 해당 인터페이스를 확장합니다.

### 2****. Implements 및 Extends :****

- **type:** **`implements`** 및 **`extends`** 키워드 사용 불가능.
- **interface:** **`implements`** 및 **`extends`** 키워드 사용 가능.

### 3. ****Declaration Merging:****

- **type:** 선언 병합이 불가능.
- **interface:** 선언 병합이 가능.

### **사용 시 고려 사항:**

- **목적에 따라 선택:** 데이터 모델링에는 **`interface`**를, 유틸리티 타입이나 유니언 등의 복잡한 타입에는 **`type alias`**을 사용하는 것이 일반적입니다.
- **가독성 및 일관성:** 프로젝트 내에서 어떤 스타일을 사용할지 결정하고 일관성 있게 사용하는 것이 좋습니다.