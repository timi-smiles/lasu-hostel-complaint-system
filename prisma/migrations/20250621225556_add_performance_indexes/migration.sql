-- DropIndex
DROP INDEX "User_studentId_idx";

-- CreateIndex
CREATE INDEX "Complaint_priority_idx" ON "Complaint"("priority");

-- CreateIndex
CREATE INDEX "User_status_idx" ON "User"("status");
