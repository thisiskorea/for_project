# 🚨 Vercel 배포 가이드

## ⚠️ 중요: Vercel은 프론트엔드만 배포하세요!

Vercel은 **프론트엔드 호스팅에 최적화**되어 있습니다.
백엔드 서비스(Auth, Project, Paper, Dataset)는 **별도로 배포**해야 합니다.

---

## ✅ 올바른 배포 방법

### 1️⃣ 프론트엔드만 Vercel에 배포

**Vercel 설정:**
1. Vercel 대시보드에서 프로젝트 선택
2. **Settings** → **General** 이동
3. 다음과 같이 설정:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web` ⬅️ 중요!
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

4. **Environment Variables** 추가:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   NEXT_PUBLIC_AUTH_URL=https://your-auth-url.com
   ```

5. **Redeploy** 클릭

---

### 2️⃣ 백엔드는 Railway에 배포 (무료!)

#### Railway 설정 (10분):

1. **[Railway.app](https://railway.app)** 방문
2. **GitHub로 로그인**
3. **New Project** → **Deploy from GitHub repo** 선택
4. 저장소 선택

5. **각 서비스별로 배포:**

   **Auth Service:**
   - Service Name: `auth-service`
   - Root Directory: `apps/auth-service`
   - Start Command: `npm run start`
   - Environment Variables:
     ```
     NODE_ENV=production
     PORT=4001
     JWT_SECRET=your-super-secret-jwt-key
     DATABASE_HOST=postgres-database-host (Railway에서 자동 제공)
     DATABASE_PORT=5432
     DATABASE_USER=postgres
     DATABASE_PASSWORD=auto-generated
     DATABASE_NAME=railway
     ```

   **Project Service:**
   - Service Name: `project-service`
   - Root Directory: `apps/project-service`
   - Start Command: `npm run start`
   - (환경 변수는 Auth Service와 유사)

   **Paper Service:**
   - Service Name: `paper-service`
   - Root Directory: `apps/paper-service`
   - Start Command: `python main.py`
   - Build Command: `pip install -r requirements.txt`
   - Environment Variables:
     ```
     PORT=4003
     MONGODB_URL=mongodb://... (Railway MongoDB)
     ELASTICSEARCH_URL=http://...
     ```

   **Dataset Service:**
   - Service Name: `dataset-service`
   - Root Directory: `apps/dataset-service`
   - Start Command: `python main.py`
   - (환경 변수는 Paper Service와 유사)

6. **데이터베이스 추가:**
   - Railway에서 **New** → **Database** 클릭
   - PostgreSQL, MongoDB, Redis 추가
   - 자동으로 연결 정보가 생성됨

---

## 🔧 현재 에러 수정

에러는 이미 수정했습니다:
- ✅ OAuth strategies를 선택적으로 로드하도록 변경
- ✅ 환경 변수가 없어도 서비스가 시작되도록 수정
- ✅ Vercel 설정 파일 추가

---

## 📝 다음 단계

### Option 1: 프론트엔드만 배포 (가장 빠름)

```bash
# Vercel에서:
# 1. Root Directory를 "apps/web"로 변경
# 2. Redeploy
# 끝!
```

**결과**: 프론트엔드는 작동하지만 백엔드 없이는 로그인 등 기능 안 됨

---

### Option 2: 풀스택 배포 (15분)

**프론트엔드 (Vercel):**
1. Root Directory: `apps/web`
2. Deploy

**백엔드 (Railway):**
1. Railway에서 4개 서비스 생성
2. 데이터베이스 추가 (PostgreSQL, MongoDB)
3. 환경 변수 설정
4. Deploy

**프론트엔드 환경 변수 업데이트 (Vercel):**
```
NEXT_PUBLIC_API_URL=https://your-railway-service.up.railway.app
```

---

## 🎯 추천 방법

**가장 쉽고 빠른 방법:**

1. **지금 당장**: Vercel에서 Root Directory를 `apps/web`로 변경 후 재배포
   - 프론트엔드 UI는 바로 볼 수 있음
   - 백엔드 기능은 안 됨 (데모용으로 충분)

2. **나중에**: Railway에서 백엔드 배포 (여유 있을 때)
   - 완전한 기능 사용 가능

---

## ❓ 지금 뭘 해야 하나요?

**Vercel 대시보드에서:**

1. 프로젝트 클릭
2. **Settings** 탭
3. **General** 섹션
4. **Root Directory** 찾기
5. `apps/web` 입력 ⬅️ 이것만 하면 됨!
6. **Save** 클릭
7. **Deployments** 탭으로 이동
8. **Redeploy** 클릭

완료! 프론트엔드가 정상 작동할 겁니다.

---

## 💡 참고

- 프론트엔드만 배포: **무료** (Vercel)
- 풀스택 배포: **무료** (Vercel + Railway 무료 티어)
- 프로덕션: $10-20/월 (Railway Pro)
