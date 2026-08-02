import { prisma } from "@/lib/db/prisma"

type SaveSearchInput = {
  name: string
  query?: string
  category?: string
  region?: string
  sort?: string
}

export async function listFavorites(userId: string) {
  return prisma.favorite.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
  })
}

export async function addFavorite(userId: string, opportunityId: string) {
  return prisma.favorite.upsert({
    where: {
      user_id_opportunity_id: {
        user_id: userId,
        opportunity_id: opportunityId,
      },
    },
    update: {},
    create: {
      user_id: userId,
      opportunity_id: opportunityId,
    },
  })
}

export async function removeFavorite(userId: string, opportunityId: string) {
  return prisma.favorite.deleteMany({
    where: {
      user_id: userId,
      opportunity_id: opportunityId,
    },
  })
}

export async function listSavedSearches(userId: string) {
  return prisma.savedSearch.findMany({
    where: { user_id: userId },
    orderBy: { updated_at: "desc" },
  })
}

export async function createSavedSearch(userId: string, input: SaveSearchInput) {
  return prisma.savedSearch.create({
    data: {
      user_id: userId,
      name: input.name,
      query: input.query,
      category: input.category,
      region: input.region,
      sort: input.sort,
    },
  })
}

export async function deleteSavedSearch(userId: string, savedSearchId: string) {
  return prisma.savedSearch.deleteMany({
    where: {
      id: savedSearchId,
      user_id: userId,
    },
  })
}

export async function listNotifications(userId: string, limit = 30) {
  return prisma.notification.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
    take: limit,
  })
}

export async function markNotificationRead(userId: string, notificationId: string) {
  return prisma.notification.updateMany({
    where: {
      id: notificationId,
      user_id: userId,
    },
    data: {
      is_read: true,
    },
  })
}

export async function listViewHistory(userId: string, limit = 50) {
  return prisma.viewHistory.findMany({
    where: { user_id: userId },
    orderBy: { viewed_at: "desc" },
    take: limit,
  })
}

export async function addViewHistory(userId: string, opportunityId: string) {
  return prisma.viewHistory.create({
    data: {
      user_id: userId,
      opportunity_id: opportunityId,
    },
  })
}
