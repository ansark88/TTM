import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, vi } from 'vitest'
import { MemberRepository } from '~/app/infrastructure/repositories/memberRepository'
import { createTestDb } from '~/lib/testDatabaseClient'
import { Members } from '~/schema/schema'
import { eq } from 'drizzle-orm'
import type { StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import type { DatabaseClientType } from '~/lib/databaseClient'

// リポジトリクラスのモック化ではなく、実際のDBに対する操作をテスト
describe('MemberRepository', () => {
  let repository: MemberRepository
  let testDb: DatabaseClientType
  let testContainer: StartedPostgreSqlContainer

  // テスト用のメンバーデータ
  const testMember = {
    userId: '123e4567-e89b-12d3-a456-426614174000', // 有効なUUID形式
    name: 'テスト用',
    screenName: 'テストユーザー',
    bio: 'テスト用のバイオ',
    iconUrl: 'https://example.com/test.png'
  }
  
  let createdMemberId: number

  beforeAll(async () => {
    const { db, container } = await createTestDb()
    testDb = db
    testContainer = container
  })

  // 各テスト前にテストデータを作成
  beforeEach(async () => {
    repository = new MemberRepository(testDb)
    
    const result = await testDb.insert(Members).values({
      userID: testMember.userId,
      name: testMember.name,
      screenName: testMember.screenName,
      bio: testMember.bio,
      iconUrl: testMember.iconUrl
    }).returning()
    
    createdMemberId = result[0].id
  })

  // 各テスト後にテストデータを削除
  afterEach(async () => {
    // テスト用のメンバーを削除
    await testDb.delete(Members).where(eq(Members.id, createdMemberId))
  })

  afterAll(async () => {
    await testDb.$client.end()
    await testContainer.stop()
  })

  describe('findAll', () => {
    it('全てのメンバーを取得できること', async () => {
      // 実行
      const members = await repository.findAll()
      
      // 検証
      expect(members).toBeDefined()
      expect(members.length).toBeGreaterThan(0)
      
      // テスト用のメンバーが含まれていることを確認
      const testMemberResult = members.find(m => m.userId === testMember.userId)
      expect(testMemberResult).toBeDefined()
      expect(testMemberResult?.name).toBe(testMember.name)
      expect(testMemberResult?.screenName).toBe(testMember.screenName)
    })
  })

  describe('findById', () => {
    it('IDによりメンバーを取得できること', async () => {
      // 実行
      const member = await repository.findById(createdMemberId)
      
      // 検証
      expect(member).toBeDefined()
      expect(member?.id).toBe(createdMemberId)
      expect(member?.userId).toBe(testMember.userId)
      expect(member?.name).toBe(testMember.name)
      expect(member?.screenName).toBe(testMember.screenName)
    })

    it('存在しないIDの場合はnullを返すこと', async () => {
      // 実行
      const nonExistentId = 99999
      const member = await repository.findById(nonExistentId)
      
      // 検証
      expect(member).toBeNull()
    })
  })

  describe('update', () => {
    it('メンバー情報を更新できること', async () => {
      // 更新データ
      const updateData = {
        name: 'テスト用（更新）',
        screenName: 'テストユーザー（更新）',
        bio: '更新されたバイオ'
      }
      
      // 実行
      const updatedMember = await repository.update(createdMemberId, updateData)
      
      // 検証
      expect(updatedMember).toBeDefined()
      expect(updatedMember.id).toBe(createdMemberId)
      expect(updatedMember.name).toBe(updateData.name)
      expect(updatedMember.screenName).toBe(updateData.screenName)
      expect(updatedMember.bio).toBe(updateData.bio)
      
      // DBに反映されていることを確認
      const dbMember = await testDb.select().from(Members).where(eq(Members.id, createdMemberId))
      expect(dbMember[0].name).toBe(updateData.name)
      expect(dbMember[0].screenName).toBe(updateData.screenName)
      expect(dbMember[0].bio).toBe(updateData.bio)
    })
  })

  describe('delete', () => {
    it('メンバーを削除できること', async () => {
      // 実行
      await repository.delete(createdMemberId)
      
      // 検証：DBから削除されていることを確認
      const dbMember = await testDb.select().from(Members).where(eq(Members.id, createdMemberId))
      expect(dbMember.length).toBe(0)
    })
  })
}) 