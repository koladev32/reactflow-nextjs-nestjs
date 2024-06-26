import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workflow } from './workflow.entity';

@Entity()
export class Node {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column('json', { nullable: true })
  config: any;

  @ManyToOne(() => Workflow, (workflow) => workflow.nodes, {
    onDelete: 'CASCADE', // Ensures all nodes are deleted if the workflow is deleted
    eager: true,
  })
  workflow: Workflow;

  @OneToMany(() => Edge, (edge) => edge.sourceNode, { eager: true })
  outgoingEdges: Edge[];

  @OneToMany(() => Edge, (edge) => edge.targetNode, { eager: true })
  incomingEdges: Edge[];

  @Column('json')
  position: { x: number; y: number };
}

@Entity()
export class Edge {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Node, (node) => node.outgoingEdges, { onDelete: 'CASCADE' })
  sourceNode: Node;

  @ManyToOne(() => Node, (node) => node.incomingEdges, { onDelete: 'CASCADE' })
  targetNode: Node;

  @Column({ nullable: true })
  label: string;
}
