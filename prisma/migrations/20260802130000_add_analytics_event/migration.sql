-- CreateTable
CREATE TABLE "AnalyticsEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "visitor_id" TEXT NOT NULL,
    "user_id" TEXT,
    "path" TEXT NOT NULL,
    "referrer" TEXT,
    "query" TEXT,
    "dwell_ms" INTEGER,
    "is_excluded" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "AnalyticsEvent_type_created_at_idx" ON "AnalyticsEvent"("type", "created_at");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_session_id_created_at_idx" ON "AnalyticsEvent"("session_id", "created_at");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_path_created_at_idx" ON "AnalyticsEvent"("path", "created_at");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_is_excluded_created_at_idx" ON "AnalyticsEvent"("is_excluded", "created_at");
