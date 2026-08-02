import {
  addFavorite,
  listFavorites,
  removeFavorite,
} from "@/services/opportunity/user-data-service"

export async function saveProgramForUser(input: {
  userId: string
  opportunityId: string
  title: string
  category?: string
}) {
  return addFavorite(input.userId, input.opportunityId)
}

export async function unsaveProgramForUser(userId: string, opportunityId: string) {
  await removeFavorite(userId, opportunityId)
}

export async function getSavedProgramsForUser(userId: string) {
  const rows = await listFavorites(userId)
  return rows.map((row) => row.opportunity_id)
}
