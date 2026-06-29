# FinCalc — 다국어 금융 계산기 허브 (fincalc.monster)

광고 수익 최적화용 **정적 웹앱**. 고단가 금융 업종 계산기 + 프로그래매틱 SEO(환율 페어 자동 생성) + **Google Search Console / AdSense 연동 인프라**까지 갖춘 상태.

- 도메인: **https://fincalc.monster**
- **한국어** = 루트(`/`), **English** = `/en`
- Astro 5 정적 빌드 · 시스템 폰트(외부 폰트 0) · 모바일 반응형 · 다크모드
- SEO: 페이지별 title/description, canonical, **hreflang**(ko/en/x-default), OG, JSON-LD, 자동 사이트맵
- 광고: **환경변수 한 번으로 AdSense on/off** — 토큰 없으면 자리표시자, 토큰 넣으면 실제 `<ins>` 광고 자동 렌더

## 도구 (20종)

| 도구 | 경로 |
|---|---|
| 대출 이자 계산기 | `/loan-calculator` |
| 복리 계산기 | `/compound-interest` |
| 환율 계산기 + 30페어 pSEO | `/currency`, `/currency/usd-krw` 등 |
| **단위 변환기** + 132페어 pSEO(평 포함) | `/unit`, `/unit/area/pyeong-to-m2` 등 |
| **퍼센트 계산기** (3모드) | `/percentage` |
| **부가세(VAT) 계산기** | `/vat` |
| **소득세 계산기** (한국/미국 누진구간) | `/income-tax` |
| **나이 계산기** + 출생연도 pSEO | `/age`, `/age/1990` 등 |
| **날짜/D-day 계산기** | `/date` |
| **연봉 실수령액 계산기** (한국, KO) | `/salary` |
| **주식 평단가·수익률 계산기** | `/stock` |
| **적금 이자 계산기** | `/savings` |
| **퇴직금 계산기** (한국, KO) | `/severance` |
| **DSR 총부채상환비율 계산기** (한국, KO) | `/dsr` |
| **배당금·배당수익률 계산기** | `/dividend` |
| **대출 상환방식 비교 계산기** | `/loan-compare` |
| **연말정산 예상 환급 계산기** (한국, KO) | `/year-tax` |
| **중도상환수수료 계산기** (한국, KO) | `/early-repay` |
| **전월세 전환율 계산기** (한국, KO) | `/jeonse` |
| **자동차 취등세 계산기** (한국, KO) | `/car-tax` |

## 정보/법적 페이지 (AdSense 승인 필수)

- `/privacy` · `/about` · `/contact` (ko/en 자동 생성)
- `/404` (다국어 404)

## 실행

```bash
npm install
cp .env.example .env      # (선택) AdSense/GSC 토큰 입력
npm run dev               # http://localhost:4321
npm run build             # → dist/ (정적, 768페이지)
npm run preview           # dist/ 미리보기
```

## 🚀 배포 → Search Console → AdSense (핵심 절차)

### 0. 환경변수 (`.env`)
```
PUBLIC_ADSENSE_CLIENT=ca-pub-0000000000000000   # AdSense > Ads > 코드에서 확인
PUBLIC_GSC_VERIFICATION=...                      # Search Console > 소유권 확인 > HTML 태그
```
→ 토큰을 넣으면: BaseLayout `<head>`에 AdSense 로더 + GSC 인증 메타가 자동 삽입되고, 모든 광고 자리가 실제 `<ins>`로 렌더됩니다. 비워두면 자리표시자만 표시(외부 요청 없음).

### 1. 배포 (무료 정적 호스팅)
`dist/` 업로드 후 도메인 `fincalc.monster` 연결:
- **Cloudflare Pages**: 빌드 `npm run build`, 출력 `dist` (추천 — 한국에서 빠름)
- **Vercel / Netlify**: Astro 자동 인식

> 환경변수는 호스팅 대시보드(또는 CLI)에 동일하게 `PUBLIC_ADSENSE_CLIENT` / `PUBLIC_GSC_VERIFICATION`로 등록.

### 2. Google Search Console 등록
1. [search.google.com/search-console](https://search.google.com/search-console) → `fincalc.monster` 추가(URL 접두어 또는 도메인).
2. 소유권 확인 → **HTML 태그** 방식 선택 → 발급받은 토큰을 `.env`의 `PUBLIC_GSC_VERIFICATION`에 입력 → 재배포.
3. **사이트맵 제출**: `https://fincalc.monster/sitemap.xml` 등록.

### 3. Google AdSense 신청
1. [adsense.com](https://www.google.com/adsense) → `fincalc.monster` 추가.
2. 승인 조건(이미 충족됨): 원본 콘텐츠 · **개인정보처리방침/소개/연락처 페이지** · 내비게이션 · 실제 도메인에서 라이브.
3. 승인 후 발급된 `ca-pub-...`를 `.env`의 `PUBLIC_ADSENSE_CLIENT`에 입력 → 재배포 → 광고 자동 표시.
4. **`public/ads.txt`**의 `pub-XXXX...`를 본인 퍼블리셔 ID로 교체 후 재배포 (AdSense 대시보드 경고 방지).

> 팁: 월 PV가 수만 단위로 커지면 Ezoic/Raptive 같은 메디에이션으로 AdSense 대비 RPM 추가 인상 가능.

## 커스터마이징

- **연락처 이메일**: `src/consts.ts`의 `CONTACT_EMAIL`.
- **환율 페어 확장**: `src/data/currencies.ts`의 `currencyPairs`에 `[from, to]` 추가 → 페어 페이지 자동 생성.
- **참고 환율 갱신**: 같은 파일의 `referenceRatesUSD` (SSR/폴백용, 주기 갱신 권장).
- **새 계산기 추가**: `ui.ts` 문자열 + `src/components/` 컴포넌트 + `public/js/*.js` + 페이지 라우트(루트 + `/en`).

## 프로젝트 구조

```
src/
  components/            # 계산기 + Header/Footer/AdSlot + pages/(페이지 단위)
  data/currencies.ts     # 통화·참고환율·pSEO 페어·getStaticPaths 헬퍼
  i18n/config.ts, ui.ts  # locale 라우팅 + 모든 UI 문자열(ko/en)
  layouts/BaseLayout.astro  # SEO + AdSense 로더 + GSC 메타(조건부)
  pages/                 # 루트=한국어, /en=영어 (+ 404.astro)
  styles/global.css
public/
  js/                    # 계산기 로직 (loan/compound/currency/percentage/vat).js — 정적 제공
  ads.txt, robots.txt, favicon.svg, site.webmanifest
astro.config.mjs         # site URL = https://fincalc.monster
.env.example             # ADSENSE_CLIENT / GSC_VERIFICATION
```

## 기술 참고

- **계산기 JS는 `public/js/*.js` 정적 제공** (`<script is:inline src defer>`). Astro 컴포넌트 `<script>` 번들이 이 환경에서 누락되는 이슈가 있어 신뢰성 우선 방식 사용.
- **외부 스크립트(AdSense 로더)는 자동으로 `is:inline` 처리**되어 가공 없이 원문 그대로 출력됨을 확인.
- 계산식: 대출 = 원리금균등상환 `M = P·r·(1+r)ⁿ / ((1+r)ⁿ−1)`, 복리 = 월 복리 미래가치. 환율 = `open.er-api.com` 실시간 + 번들 폴백.
