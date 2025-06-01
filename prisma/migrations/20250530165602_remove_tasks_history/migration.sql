/*
  Warnings:

  - You are about to drop the `Tasks_history` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tasks_history" DROP CONSTRAINT "Tasks_history_task_id_fkey";

-- DropForeignKey
ALTER TABLE "Tasks_history" DROP CONSTRAINT "Tasks_history_user_id_fkey";

-- DropTable
DROP TABLE "Tasks_history";
