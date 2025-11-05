// Switch to airesearch database
db = db.getSiblingDB('airesearch');

// Create collections
db.createCollection('papers');
db.createCollection('posts');
db.createCollection('comments');
db.createCollection('notifications');
db.createCollection('activities');

// Create indexes
db.papers.createIndex({ title: 'text', abstract: 'text', full_text: 'text' });
db.papers.createIndex({ arxiv_id: 1 }, { unique: true, sparse: true });
db.papers.createIndex({ doi: 1 });
db.papers.createIndex({ categories: 1 });
db.papers.createIndex({ published_date: -1 });

db.posts.createIndex({ title: 'text', content: 'text' });
db.posts.createIndex({ author_id: 1 });
db.posts.createIndex({ category: 1 });
db.posts.createIndex({ tags: 1 });
db.posts.createIndex({ last_activity_at: -1 });

db.comments.createIndex({ post_id: 1, created_at: 1 });
db.comments.createIndex({ parent_id: 1 });
db.comments.createIndex({ author_id: 1 });

db.notifications.createIndex({ user_id: 1, is_read: 1 });
db.notifications.createIndex({ created_at: -1 });

db.activities.createIndex({ user_id: 1, created_at: -1 });
db.activities.createIndex({ resource_type: 1, resource_id: 1 });

print('Collections and indexes created successfully');
