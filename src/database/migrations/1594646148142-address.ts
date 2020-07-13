import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm'

export class address1594646148142 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'addresses',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'street',
          type: 'varchar'
        },
        {
          name: 'neighborhood',
          type: 'varchar'
        },
        {
          name: 'address_number',
          type: 'integer'
        },
        {
          name: 'city',
          type: 'varchar'
        },
        {
          name: 'state',
          type: 'varchar'
        },
        {
          name: 'complement',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }))

    await queryRunner.addColumn('addresses', new TableColumn({
      name: 'user_id',
      type: 'uuid'
    }))

    await queryRunner.createForeignKey('addresses', new TableForeignKey({
      name: 'user_address_fk',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('addresses', 'user_address_fk')
    await queryRunner.dropColumn('addresses', 'user_id')
    await queryRunner.dropTable('addresses')
  }
}
