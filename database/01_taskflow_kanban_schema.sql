BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TYPE user_status_enum AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING');
CREATE TYPE project_status_enum AS ENUM ('ACTIVE', 'ARCHIVED', 'SUSPENDED');
CREATE TYPE task_priority_enum AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');
CREATE TYPE task_status_enum AS ENUM ('OPEN', 'IN_PROGRESS', 'BLOCKED', 'DONE', 'ARCHIVED');
CREATE TYPE notification_type_enum AS ENUM (
  'TASK_ASSIGNED',
  'TASK_UPDATED',
  'TASK_COMMENTED',
  'TASK_DUE_SOON',
  'TASK_OVERDUE',
  'PROJECT_UPDATED',
  'SYSTEM'
);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validate_task_label_project()
RETURNS TRIGGER AS $$
DECLARE
  task_project_id UUID;
  label_project_id UUID;
BEGIN
  SELECT b.project_id
  INTO task_project_id
  FROM tasks t
  JOIN boards b ON b.id = t.board_id
  WHERE t.id = NEW.task_id;

  SELECT l.project_id
  INTO label_project_id
  FROM labels l
  WHERE l.id = NEW.label_id;

  IF task_project_id IS NULL OR label_project_id IS NULL OR task_project_id <> label_project_id THEN
    RAISE EXCEPTION 'task label project mismatch';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE auth_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(320) NOT NULL,
  username VARCHAR(80),
  password_hash TEXT NOT NULL,
  status user_status_enum NOT NULL DEFAULT 'ACTIVE',
  avatar_url TEXT,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  created_by UUID,
  updated_by UUID,
  CONSTRAINT chk_auth_users_email_lowercase CHECK (email = lower(email)),
  CONSTRAINT chk_auth_users_email_format CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
  CONSTRAINT chk_auth_users_username_length CHECK (username IS NULL OR char_length(username) >= 3)
);

CREATE TABLE auth_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(80) NOT NULL,
  description TEXT,
  is_system BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  created_by UUID,
  updated_by UUID,
  CONSTRAINT chk_auth_roles_name_uppercase CHECK (name = upper(name))
);

CREATE TABLE auth_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(120) NOT NULL,
  description TEXT,
  resource VARCHAR(80) NOT NULL,
  action VARCHAR(80) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  created_by UUID,
  updated_by UUID,
  CONSTRAINT chk_auth_permissions_name_format CHECK (name ~ '^[a-z][a-z0-9_]*:[a-z][a-z0-9_]*$')
);

CREATE TABLE auth_user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  created_by UUID,
  updated_by UUID
);

CREATE TABLE auth_role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id UUID NOT NULL,
  permission_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  created_by UUID,
  updated_by UUID
);

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL,
  name VARCHAR(180) NOT NULL,
  description TEXT,
  status project_status_enum NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  created_by UUID,
  updated_by UUID,
  CONSTRAINT chk_projects_name_length CHECK (char_length(trim(name)) >= 2)
);

CREATE TABLE project_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL,
  user_id UUID NOT NULL,
  role_id UUID,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  created_by UUID,
  updated_by UUID
);

CREATE TABLE boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL,
  name VARCHAR(180) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  created_by UUID,
  updated_by UUID,
  CONSTRAINT chk_boards_name_length CHECK (char_length(trim(name)) >= 2)
);

CREATE TABLE board_columns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id UUID NOT NULL,
  name VARCHAR(120) NOT NULL,
  order_position INTEGER NOT NULL,
  color VARCHAR(20),
  is_done BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  created_by UUID,
  updated_by UUID,
  CONSTRAINT uq_board_columns_board_id_id UNIQUE (board_id, id),
  CONSTRAINT chk_board_columns_name_length CHECK (char_length(trim(name)) >= 2),
  CONSTRAINT chk_board_columns_order_position CHECK (order_position >= 0),
  CONSTRAINT chk_board_columns_color_format CHECK (color IS NULL OR color ~ '^#[0-9A-Fa-f]{6}$')
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id UUID NOT NULL,
  column_id UUID NOT NULL,
  creator_id UUID NOT NULL,
  title VARCHAR(240) NOT NULL,
  description TEXT,
  priority task_priority_enum NOT NULL DEFAULT 'MEDIUM',
  due_date TIMESTAMPTZ,
  order_position INTEGER NOT NULL DEFAULT 0,
  estimated_hours NUMERIC(8,2),
  status task_status_enum NOT NULL DEFAULT 'OPEN',
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  created_by UUID,
  updated_by UUID,
  CONSTRAINT chk_tasks_title_length CHECK (char_length(trim(title)) >= 2),
  CONSTRAINT chk_tasks_order_position CHECK (order_position >= 0),
  CONSTRAINT chk_tasks_estimated_hours CHECK (estimated_hours IS NULL OR estimated_hours >= 0),
  CONSTRAINT chk_tasks_completed_state CHECK (
    (status = 'DONE' AND completed_at IS NOT NULL)
    OR (status <> 'DONE')
  )
);

CREATE TABLE task_assignees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL,
  user_id UUID NOT NULL,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  created_by UUID,
  updated_by UUID
);

CREATE TABLE subtasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL,
  title VARCHAR(240) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  order_position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  created_by UUID,
  updated_by UUID,
  CONSTRAINT chk_subtasks_title_length CHECK (char_length(trim(title)) >= 2),
  CONSTRAINT chk_subtasks_order_position CHECK (order_position >= 0)
);

CREATE TABLE task_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  edited_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  created_by UUID,
  updated_by UUID,
  CONSTRAINT chk_task_comments_content_length CHECK (char_length(trim(content)) >= 1)
);

CREATE TABLE task_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL,
  uploaded_by UUID NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  mime_type VARCHAR(150) NOT NULL,
  size_bytes BIGINT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  created_by UUID,
  updated_by UUID,
  CONSTRAINT chk_task_attachments_file_name_length CHECK (char_length(trim(file_name)) >= 1),
  CONSTRAINT chk_task_attachments_size_bytes CHECK (size_bytes >= 0)
);

CREATE TABLE labels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL,
  name VARCHAR(80) NOT NULL,
  color VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  created_by UUID,
  updated_by UUID,
  CONSTRAINT chk_labels_name_length CHECK (char_length(trim(name)) >= 2),
  CONSTRAINT chk_labels_color_format CHECK (color ~ '^#[0-9A-Fa-f]{6}$')
);

CREATE TABLE task_labels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL,
  label_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  created_by UUID,
  updated_by UUID
);

CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID,
  entity_type VARCHAR(80) NOT NULL,
  entity_id UUID NOT NULL,
  action VARCHAR(120) NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  created_by UUID,
  updated_by UUID,
  CONSTRAINT chk_activity_logs_entity_type_length CHECK (char_length(trim(entity_type)) >= 2),
  CONSTRAINT chk_activity_logs_action_length CHECK (char_length(trim(action)) >= 2),
  CONSTRAINT chk_activity_logs_metadata_object CHECK (jsonb_typeof(metadata) = 'object')
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  type notification_type_enum NOT NULL,
  title VARCHAR(160) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  created_by UUID,
  updated_by UUID,
  CONSTRAINT chk_notifications_title_length CHECK (char_length(trim(title)) >= 2),
  CONSTRAINT chk_notifications_message_length CHECK (char_length(trim(message)) >= 1),
  CONSTRAINT chk_notifications_metadata_object CHECK (jsonb_typeof(metadata) = 'object'),
  CONSTRAINT chk_notifications_read_state CHECK (
    (is_read = TRUE AND read_at IS NOT NULL)
    OR (is_read = FALSE)
  )
);

ALTER TABLE auth_users
  ADD CONSTRAINT fk_auth_users_created_by FOREIGN KEY (created_by) REFERENCES auth_users(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_auth_users_updated_by FOREIGN KEY (updated_by) REFERENCES auth_users(id) ON DELETE SET NULL;

ALTER TABLE auth_roles
  ADD CONSTRAINT fk_auth_roles_created_by FOREIGN KEY (created_by) REFERENCES auth_users(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_auth_roles_updated_by FOREIGN KEY (updated_by) REFERENCES auth_users(id) ON DELETE SET NULL;

ALTER TABLE auth_permissions
  ADD CONSTRAINT fk_auth_permissions_created_by FOREIGN KEY (created_by) REFERENCES auth_users(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_auth_permissions_updated_by FOREIGN KEY (updated_by) REFERENCES auth_users(id) ON DELETE SET NULL;

ALTER TABLE auth_user_roles
  ADD CONSTRAINT fk_auth_user_roles_user_id FOREIGN KEY (user_id) REFERENCES auth_users(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_auth_user_roles_role_id FOREIGN KEY (role_id) REFERENCES auth_roles(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_auth_user_roles_created_by FOREIGN KEY (created_by) REFERENCES auth_users(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_auth_user_roles_updated_by FOREIGN KEY (updated_by) REFERENCES auth_users(id) ON DELETE SET NULL;

ALTER TABLE auth_role_permissions
  ADD CONSTRAINT fk_auth_role_permissions_role_id FOREIGN KEY (role_id) REFERENCES auth_roles(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_auth_role_permissions_permission_id FOREIGN KEY (permission_id) REFERENCES auth_permissions(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_auth_role_permissions_created_by FOREIGN KEY (created_by) REFERENCES auth_users(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_auth_role_permissions_updated_by FOREIGN KEY (updated_by) REFERENCES auth_users(id) ON DELETE SET NULL;

ALTER TABLE projects
  ADD CONSTRAINT fk_projects_owner_id FOREIGN KEY (owner_id) REFERENCES auth_users(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_projects_created_by FOREIGN KEY (created_by) REFERENCES auth_users(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_projects_updated_by FOREIGN KEY (updated_by) REFERENCES auth_users(id) ON DELETE SET NULL;

ALTER TABLE project_members
  ADD CONSTRAINT fk_project_members_project_id FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_project_members_user_id FOREIGN KEY (user_id) REFERENCES auth_users(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_project_members_role_id FOREIGN KEY (role_id) REFERENCES auth_roles(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_project_members_created_by FOREIGN KEY (created_by) REFERENCES auth_users(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_project_members_updated_by FOREIGN KEY (updated_by) REFERENCES auth_users(id) ON DELETE SET NULL;

ALTER TABLE boards
  ADD CONSTRAINT fk_boards_project_id FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_boards_created_by FOREIGN KEY (created_by) REFERENCES auth_users(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_boards_updated_by FOREIGN KEY (updated_by) REFERENCES auth_users(id) ON DELETE SET NULL;

ALTER TABLE board_columns
  ADD CONSTRAINT fk_board_columns_board_id FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_board_columns_created_by FOREIGN KEY (created_by) REFERENCES auth_users(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_board_columns_updated_by FOREIGN KEY (updated_by) REFERENCES auth_users(id) ON DELETE SET NULL;

ALTER TABLE tasks
  ADD CONSTRAINT fk_tasks_board_id FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_tasks_column_id FOREIGN KEY (column_id) REFERENCES board_columns(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_tasks_board_column FOREIGN KEY (board_id, column_id) REFERENCES board_columns(board_id, id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_tasks_creator_id FOREIGN KEY (creator_id) REFERENCES auth_users(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_tasks_created_by FOREIGN KEY (created_by) REFERENCES auth_users(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_tasks_updated_by FOREIGN KEY (updated_by) REFERENCES auth_users(id) ON DELETE SET NULL;

ALTER TABLE task_assignees
  ADD CONSTRAINT fk_task_assignees_task_id FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_task_assignees_user_id FOREIGN KEY (user_id) REFERENCES auth_users(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_task_assignees_created_by FOREIGN KEY (created_by) REFERENCES auth_users(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_task_assignees_updated_by FOREIGN KEY (updated_by) REFERENCES auth_users(id) ON DELETE SET NULL;

ALTER TABLE subtasks
  ADD CONSTRAINT fk_subtasks_task_id FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_subtasks_created_by FOREIGN KEY (created_by) REFERENCES auth_users(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_subtasks_updated_by FOREIGN KEY (updated_by) REFERENCES auth_users(id) ON DELETE SET NULL;

ALTER TABLE task_comments
  ADD CONSTRAINT fk_task_comments_task_id FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_task_comments_user_id FOREIGN KEY (user_id) REFERENCES auth_users(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_task_comments_created_by FOREIGN KEY (created_by) REFERENCES auth_users(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_task_comments_updated_by FOREIGN KEY (updated_by) REFERENCES auth_users(id) ON DELETE SET NULL;

ALTER TABLE task_attachments
  ADD CONSTRAINT fk_task_attachments_task_id FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_task_attachments_uploaded_by FOREIGN KEY (uploaded_by) REFERENCES auth_users(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_task_attachments_created_by FOREIGN KEY (created_by) REFERENCES auth_users(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_task_attachments_updated_by FOREIGN KEY (updated_by) REFERENCES auth_users(id) ON DELETE SET NULL;

ALTER TABLE labels
  ADD CONSTRAINT fk_labels_project_id FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_labels_created_by FOREIGN KEY (created_by) REFERENCES auth_users(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_labels_updated_by FOREIGN KEY (updated_by) REFERENCES auth_users(id) ON DELETE SET NULL;

ALTER TABLE task_labels
  ADD CONSTRAINT fk_task_labels_task_id FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_task_labels_label_id FOREIGN KEY (label_id) REFERENCES labels(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_task_labels_created_by FOREIGN KEY (created_by) REFERENCES auth_users(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_task_labels_updated_by FOREIGN KEY (updated_by) REFERENCES auth_users(id) ON DELETE SET NULL;

ALTER TABLE activity_logs
  ADD CONSTRAINT fk_activity_logs_actor_id FOREIGN KEY (actor_id) REFERENCES auth_users(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_activity_logs_created_by FOREIGN KEY (created_by) REFERENCES auth_users(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_activity_logs_updated_by FOREIGN KEY (updated_by) REFERENCES auth_users(id) ON DELETE SET NULL;

ALTER TABLE notifications
  ADD CONSTRAINT fk_notifications_user_id FOREIGN KEY (user_id) REFERENCES auth_users(id) ON DELETE RESTRICT,
  ADD CONSTRAINT fk_notifications_created_by FOREIGN KEY (created_by) REFERENCES auth_users(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_notifications_updated_by FOREIGN KEY (updated_by) REFERENCES auth_users(id) ON DELETE SET NULL;

CREATE UNIQUE INDEX ux_auth_users_email_active ON auth_users (email) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX ux_auth_users_username_active ON auth_users (username) WHERE username IS NOT NULL AND deleted_at IS NULL;
CREATE INDEX ix_auth_users_status ON auth_users (status) WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX ux_auth_roles_name_active ON auth_roles (name) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX ux_auth_permissions_name_active ON auth_permissions (name) WHERE deleted_at IS NULL;
CREATE INDEX ix_auth_permissions_resource_action ON auth_permissions (resource, action) WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX ux_auth_user_roles_active ON auth_user_roles (user_id, role_id) WHERE deleted_at IS NULL;
CREATE INDEX ix_auth_user_roles_user_id ON auth_user_roles (user_id) WHERE deleted_at IS NULL;
CREATE INDEX ix_auth_user_roles_role_id ON auth_user_roles (role_id) WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX ux_auth_role_permissions_active ON auth_role_permissions (role_id, permission_id) WHERE deleted_at IS NULL;
CREATE INDEX ix_auth_role_permissions_role_id ON auth_role_permissions (role_id) WHERE deleted_at IS NULL;
CREATE INDEX ix_auth_role_permissions_permission_id ON auth_role_permissions (permission_id) WHERE deleted_at IS NULL;

CREATE INDEX ix_projects_owner_id ON projects (owner_id) WHERE deleted_at IS NULL;
CREATE INDEX ix_projects_status_created_at ON projects (status, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX ix_projects_name_trgm ON projects USING GIN (lower(name) gin_trgm_ops) WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX ux_project_members_active ON project_members (project_id, user_id) WHERE deleted_at IS NULL;
CREATE INDEX ix_project_members_project_id ON project_members (project_id) WHERE deleted_at IS NULL;
CREATE INDEX ix_project_members_user_id ON project_members (user_id) WHERE deleted_at IS NULL;

CREATE INDEX ix_boards_project_id ON boards (project_id) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX ux_boards_project_name_active ON boards (project_id, lower(name)) WHERE deleted_at IS NULL;

CREATE INDEX ix_board_columns_board_id ON board_columns (board_id) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX ux_board_columns_board_order_active ON board_columns (board_id, order_position) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX ux_board_columns_board_name_active ON board_columns (board_id, lower(name)) WHERE deleted_at IS NULL;

CREATE INDEX ix_tasks_board_column_order ON tasks (board_id, column_id, order_position) WHERE deleted_at IS NULL;
CREATE INDEX ix_tasks_creator_id ON tasks (creator_id) WHERE deleted_at IS NULL;
CREATE INDEX ix_tasks_priority ON tasks (priority) WHERE deleted_at IS NULL;
CREATE INDEX ix_tasks_status ON tasks (status) WHERE deleted_at IS NULL;
CREATE INDEX ix_tasks_due_date ON tasks (due_date) WHERE deleted_at IS NULL AND due_date IS NOT NULL;
CREATE INDEX ix_tasks_board_status_priority ON tasks (board_id, status, priority) WHERE deleted_at IS NULL;
CREATE INDEX ix_tasks_title_trgm ON tasks USING GIN (lower(title) gin_trgm_ops) WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX ux_task_assignees_active ON task_assignees (task_id, user_id) WHERE deleted_at IS NULL;
CREATE INDEX ix_task_assignees_task_id ON task_assignees (task_id) WHERE deleted_at IS NULL;
CREATE INDEX ix_task_assignees_user_id ON task_assignees (user_id) WHERE deleted_at IS NULL;

CREATE INDEX ix_subtasks_task_order ON subtasks (task_id, order_position) WHERE deleted_at IS NULL;
CREATE INDEX ix_task_comments_task_created_at ON task_comments (task_id, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX ix_task_comments_user_id ON task_comments (user_id) WHERE deleted_at IS NULL;
CREATE INDEX ix_task_comments_content_trgm ON task_comments USING GIN (lower(content) gin_trgm_ops) WHERE deleted_at IS NULL;
CREATE INDEX ix_task_attachments_task_id ON task_attachments (task_id) WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX ux_labels_project_name_active ON labels (project_id, lower(name)) WHERE deleted_at IS NULL;
CREATE INDEX ix_labels_project_id ON labels (project_id) WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX ux_task_labels_active ON task_labels (task_id, label_id) WHERE deleted_at IS NULL;
CREATE INDEX ix_task_labels_task_id ON task_labels (task_id) WHERE deleted_at IS NULL;
CREATE INDEX ix_task_labels_label_id ON task_labels (label_id) WHERE deleted_at IS NULL;

CREATE INDEX ix_activity_logs_actor_created_at ON activity_logs (actor_id, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX ix_activity_logs_entity ON activity_logs (entity_type, entity_id, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX ix_activity_logs_action ON activity_logs (action) WHERE deleted_at IS NULL;
CREATE INDEX ix_activity_logs_metadata_gin ON activity_logs USING GIN (metadata);

CREATE INDEX ix_notifications_user_read_created_at ON notifications (user_id, is_read, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX ix_notifications_user_type_created_at ON notifications (user_id, type, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX ix_notifications_metadata_gin ON notifications USING GIN (metadata);

CREATE TRIGGER trg_auth_users_set_updated_at BEFORE UPDATE ON auth_users FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_auth_roles_set_updated_at BEFORE UPDATE ON auth_roles FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_auth_permissions_set_updated_at BEFORE UPDATE ON auth_permissions FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_auth_user_roles_set_updated_at BEFORE UPDATE ON auth_user_roles FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_auth_role_permissions_set_updated_at BEFORE UPDATE ON auth_role_permissions FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_projects_set_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_project_members_set_updated_at BEFORE UPDATE ON project_members FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_boards_set_updated_at BEFORE UPDATE ON boards FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_board_columns_set_updated_at BEFORE UPDATE ON board_columns FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_tasks_set_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_task_assignees_set_updated_at BEFORE UPDATE ON task_assignees FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_subtasks_set_updated_at BEFORE UPDATE ON subtasks FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_task_comments_set_updated_at BEFORE UPDATE ON task_comments FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_task_attachments_set_updated_at BEFORE UPDATE ON task_attachments FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_labels_set_updated_at BEFORE UPDATE ON labels FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_task_labels_set_updated_at BEFORE UPDATE ON task_labels FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_activity_logs_set_updated_at BEFORE UPDATE ON activity_logs FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_notifications_set_updated_at BEFORE UPDATE ON notifications FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_task_labels_validate_project
BEFORE INSERT OR UPDATE ON task_labels
FOR EACH ROW EXECUTE FUNCTION validate_task_label_project();

INSERT INTO auth_roles (name, description, is_system)
VALUES
  ('SUPER_ADMIN', 'Full platform access and system ownership.', TRUE),
  ('ADMIN', 'Administrative access for users, projects, boards and operational configuration.', TRUE),
  ('MANAGER', 'Project and team management access.', TRUE),
  ('USER', 'Standard task execution and collaboration access.', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO auth_permissions (name, description, resource, action)
VALUES
  ('users:create', 'Create users.', 'users', 'create'),
  ('users:read', 'Read users.', 'users', 'read'),
  ('users:update', 'Update users.', 'users', 'update'),
  ('users:delete', 'Soft delete users.', 'users', 'delete'),
  ('roles:manage', 'Manage roles.', 'roles', 'manage'),
  ('permissions:manage', 'Manage permissions.', 'permissions', 'manage'),
  ('projects:create', 'Create projects.', 'projects', 'create'),
  ('projects:read', 'Read projects.', 'projects', 'read'),
  ('projects:update', 'Update projects.', 'projects', 'update'),
  ('projects:delete', 'Soft delete projects.', 'projects', 'delete'),
  ('project_members:manage', 'Manage project members.', 'project_members', 'manage'),
  ('boards:create', 'Create boards.', 'boards', 'create'),
  ('boards:read', 'Read boards.', 'boards', 'read'),
  ('boards:update', 'Update boards.', 'boards', 'update'),
  ('boards:delete', 'Soft delete boards.', 'boards', 'delete'),
  ('board_columns:manage', 'Manage board columns.', 'board_columns', 'manage'),
  ('tasks:create', 'Create tasks.', 'tasks', 'create'),
  ('tasks:read', 'Read tasks.', 'tasks', 'read'),
  ('tasks:update', 'Update tasks.', 'tasks', 'update'),
  ('tasks:delete', 'Soft delete tasks.', 'tasks', 'delete'),
  ('tasks:move', 'Move tasks between columns.', 'tasks', 'move'),
  ('tasks:assign', 'Assign users to tasks.', 'tasks', 'assign'),
  ('comments:create', 'Create task comments.', 'comments', 'create'),
  ('comments:update', 'Update own task comments.', 'comments', 'update'),
  ('attachments:create', 'Upload task attachments.', 'attachments', 'create'),
  ('labels:manage', 'Manage project labels.', 'labels', 'manage'),
  ('dashboard:view', 'View dashboards and KPIs.', 'dashboard', 'view'),
  ('notifications:read', 'Read notifications.', 'notifications', 'read'),
  ('activity:read', 'Read activity logs.', 'activity', 'read')
ON CONFLICT DO NOTHING;

INSERT INTO auth_role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM auth_roles r
CROSS JOIN auth_permissions p
WHERE r.name = 'SUPER_ADMIN'
ON CONFLICT DO NOTHING;

INSERT INTO auth_role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM auth_roles r
JOIN auth_permissions p ON p.name IN (
  'users:create',
  'users:read',
  'users:update',
  'projects:create',
  'projects:read',
  'projects:update',
  'projects:delete',
  'project_members:manage',
  'boards:create',
  'boards:read',
  'boards:update',
  'boards:delete',
  'board_columns:manage',
  'tasks:create',
  'tasks:read',
  'tasks:update',
  'tasks:delete',
  'tasks:move',
  'tasks:assign',
  'comments:create',
  'comments:update',
  'attachments:create',
  'labels:manage',
  'dashboard:view',
  'notifications:read',
  'activity:read'
)
WHERE r.name = 'ADMIN'
ON CONFLICT DO NOTHING;

INSERT INTO auth_role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM auth_roles r
JOIN auth_permissions p ON p.name IN (
  'users:read',
  'projects:read',
  'projects:update',
  'project_members:manage',
  'boards:create',
  'boards:read',
  'boards:update',
  'board_columns:manage',
  'tasks:create',
  'tasks:read',
  'tasks:update',
  'tasks:move',
  'tasks:assign',
  'comments:create',
  'comments:update',
  'attachments:create',
  'labels:manage',
  'dashboard:view',
  'notifications:read',
  'activity:read'
)
WHERE r.name = 'MANAGER'
ON CONFLICT DO NOTHING;

INSERT INTO auth_role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM auth_roles r
JOIN auth_permissions p ON p.name IN (
  'projects:read',
  'boards:read',
  'tasks:create',
  'tasks:read',
  'tasks:update',
  'tasks:move',
  'comments:create',
  'comments:update',
  'attachments:create',
  'notifications:read'
)
WHERE r.name = 'USER'
ON CONFLICT DO NOTHING;

INSERT INTO auth_users (email, username, password_hash, status)
VALUES (
  'admin@taskflow.local',
  'superadmin',
  '$2b$12$replace_this_hash_before_production_000000000000000000000000000',
  'ACTIVE'
)
ON CONFLICT DO NOTHING;

INSERT INTO auth_user_roles (user_id, role_id)
SELECT u.id, r.id
FROM auth_users u
JOIN auth_roles r ON r.name = 'SUPER_ADMIN'
WHERE u.email = 'admin@taskflow.local'
ON CONFLICT DO NOTHING;

COMMIT;
