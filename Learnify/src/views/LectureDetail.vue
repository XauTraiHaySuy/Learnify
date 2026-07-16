<template>
  <div class="lecture-detail-page">
    <button class="back-btn" @click="goBack">
      ← Quay lại
    </button>
    
    <div class="content-layout">
      <!-- Main Content (Video & Details) -->
      <div class="main-content" v-if="lecture && lecture._id">
        <!-- Video Player Mockup -->
        <div class="video-container">
          <div class="video-placeholder" v-if="!(lecture.videoUrl || lecture.url)">
            <div class="play-icon">▶</div>
            <p>Trình phát video sẽ hiển thị ở đây</p>
          </div>
          <div class="video-placeholder" v-else-if="videoError">
            <div class="play-icon" style="color: #ef4444;">⚠</div>
            <p>Không thể tải video (Lỗi 404 hoặc video không tồn tại)</p>
          </div>
          <video v-else
            :src="lecture.videoUrl || lecture.url"
            controls
            style="width:100%; height:100%;"
            @error="handleVideoError">
          </video>
        </div>

        <div class="video-info">
          <h1 class="video-title">{{ lecture.title }}</h1>
          
          <div class="video-actions">
            <div class="instructor-profile">
              <div class="avatar">{{ lecture.instructor ? lecture.instructor.charAt(0) : '?' }}</div>
              <div class="instructor-details">
                <span class="name">{{ lecture.instructor }}</span>
                <span class="subscribers">{{ instructorStats.totalStudents }} học viên tham gia</span>
              </div>
              <button class="subscribe-btn" 
                      @click="joinClass" 
                      :disabled="joinStatus !== 'idle'"
                      v-if="currentUser?._id && lecture?.instructor && String(currentUser._id) !== String(lecture.instructor._id || lecture.instructor)">
                {{ joinStatus === 'requested' ? 'Đã gửi yêu cầu' : 'Tham gia lớp học' }}
              </button>
            </div>
            
            <div class="action-buttons">
              <button class="action-btn share-btn">
                <span class="icon">🔗</span> Chia sẻ
              </button>
            </div>
          </div>
          
          <div class="video-description glass-panel">
            <p class="views-date">{{ lecture.views }} lượt xem</p>
            <p class="desc-text">{{ lecture.description }}</p>
          </div>
        </div>

        <!-- Comments Section -->
        <div class="comments-section">
          <h3 class="comments-count">{{ comments.length }} Bình luận</h3>
          
          <div class="comment-input-area">
            <div class="avatar user-avatar">{{ currentUser ? currentUser.name.charAt(0) : 'U' }}</div>
            <div class="input-wrapper">
              <input type="text" v-model="newCommentText" placeholder="Viết bình luận..." class="comment-input" @keyup.enter="sendComment(null)" />
              <div class="input-actions" v-if="newCommentText.trim()">
                <button class="btn-cancel" @click="newCommentText = ''">Hủy</button>
                <button class="btn-submit" @click="sendComment(null)">Bình luận</button>
              </div>
            </div>
          </div>

          <div class="comments-list">
            <div v-for="comment in comments" :key="comment._id" class="comment-thread">
              <!-- Main Comment -->
              <div class="comment">
                <div class="avatar">{{ comment.user_id.name.charAt(0) }}</div>
                <div class="comment-content">
                  <div class="comment-header">
                    <span class="comment-author" :class="{'instructor-name': comment.user_id.role === 'instructor'}">
                        {{ comment.user_id.name }}
                        <span v-if="comment.user_id.role === 'instructor'" class="instructor-badge">Giảng viên</span>
                    </span>
                    <span class="comment-time">{{ formatDate(comment.createdAt) }}</span>
                  </div>
                  <p class="comment-text">{{ comment.text }}</p>
                  <div class="comment-actions">
                    <button class="action-small" @click="toggleReply(comment._id)">Phản hồi</button>
                  </div>

                  <!-- Reply Input -->
                  <div class="reply-input-area" v-if="activeReplyId === comment._id">
                     <div class="input-wrapper">
                        <input type="text" v-model="replyText" placeholder="Viết phản hồi..." class="comment-input" @keyup.enter="sendComment(comment._id)" />
                        <div class="input-actions" v-if="replyText.trim()">
                            <button class="btn-cancel" @click="activeReplyId = null">Hủy</button>
                            <button class="btn-submit" @click="sendComment(comment._id)">Trả lời</button>
                        </div>
                     </div>
                  </div>
                </div>
              </div>

              <!-- Replies (Nested) -->
              <div class="replies-list" v-if="comment.replies && comment.replies.length > 0">
                <div v-for="reply in comment.replies" :key="reply._id" class="comment reply">
                  <div class="avatar reply-avatar" :class="{'instructor-avatar': reply.user_id.role === 'instructor'}">
                    {{ reply.user_id.name.charAt(0) }}
                  </div>
                  <div class="comment-content">
                    <div class="comment-header">
                      <span class="comment-author" :class="{'instructor-name': reply.user_id.role === 'instructor'}">
                        {{ reply.user_id.name }}
                        <span v-if="reply.user_id.role === 'instructor'" class="instructor-badge">Giảng viên</span>
                      </span>
                      <span class="comment-time">{{ formatDate(reply.createdAt) }}</span>
                    </div>
                    <p class="comment-text">
                      {{ reply.text }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Loading State -->
      <div class="main-content" v-else>
        <div style="padding: 3rem; text-align: center; color: var(--text-muted);">
          <div style="font-size: 2rem; margin-bottom: 1rem;">⏳</div>
          <p>Đang tải dữ liệu bài giảng...</p>
        </div>
      </div>

      <!-- Side Recommendations -->
      <div class="recommendations">
        <h3 class="section-title">Bài giảng liên quan</h3>
        <div class="recmd-list">
          <div v-for="item in relatedLectures" :key="item._id" class="recmd-item" @click="goToAnother(item._id)">
            <img :src="`https://via.placeholder.com/320x180/e2e8f0/64748b?text=Video`" class="recmd-thumb" />
            <div class="recmd-info">
              <h4 class="recmd-title">{{ item.title }}</h4>
              <p class="recmd-author">{{ item.instructor }}</p>
              <p class="recmd-meta">{{ item.views }} lượt xem</p>
            </div>
          </div>
          <p v-if="relatedLectures.length === 0" class="no-data">Không có bài giảng liên quan.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import io from 'socket.io-client';

const route = useRoute();
const router = useRouter();

const courseId = route.params.id;

const lecture = ref({});
const instructorStats = ref({ totalStudents: 0 });
const relatedLectures = ref([]);
const comments = ref([]);

const newCommentText = ref('');
const replyText = ref('');
const activeReplyId = ref(null);
const videoError = ref(false);

const handleVideoError = () => {
    videoError.value = true;
};

const currentUser = ref(null); // Assuming user is saved in localStorage after login
let socket = null;
const joinStatus = ref('idle'); // idle, loading, requested

const goBack = () => {
  router.back();
};

const goToAnother = (id) => {
  const prefix = currentUser.value?.role === 'admin' ? '/admin' : (currentUser.value?.role === 'student' ? '/student' : '/instructor');
  router.push(`${prefix}/lectures/${id}`);
};

const joinClass = async () => {
    if (lecture.value && lecture.value.course_id && currentUser.value) {
        try {
            joinStatus.value = 'loading';
            const res = await fetch('http://localhost:5000/api/requests/join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentId: currentUser.value._id || currentUser.value.id,
                    courseId: lecture.value.course_id,
                    instructorId: lecture.value.instructor_id || lecture.value.instructor._id || lecture.value.instructor
                })
            });
            if (res.ok) {
                joinStatus.value = 'requested';
            } else {
                alert('Có lỗi xảy ra khi gửi yêu cầu.');
                joinStatus.value = 'idle';
            }
        } catch (error) {
            console.error(error);
            alert('Có lỗi xảy ra khi gửi yêu cầu.');
            joinStatus.value = 'idle';
        }
    }
};

const toggleReply = (commentId) => {
    if (activeReplyId.value === commentId) {
        activeReplyId.value = null;
    } else {
        activeReplyId.value = commentId;
        replyText.value = '';
    }
};

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN');
};

const fetchLectureData = async () => {
    try {
        // Fetch Lecture Details
        const res = await fetch(`http://localhost:5000/api/courses/${courseId}`);
        if (res.ok) {
            lecture.value = await res.json();
            
            const viewerId = currentUser.value?._id || currentUser.value?.id;
            const instructorId = lecture.value.instructor_id;

            // Chỉ gọi API tăng view nếu KHÔNG PHẢI tác giả VÀ bài giảng ĐANG CÔNG KHAI
            if (!lecture.value.isPrivate && String(viewerId) !== String(instructorId)) {
                const viewRes = await fetch(`http://localhost:5000/api/courses/${courseId}/view`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ viewerId: viewerId })
                });
                
                if (viewRes.ok) {
                    const viewData = await viewRes.json();
                    if (viewData.views) {
                        lecture.value.views = viewData.views;
                    }
                }
            }
        }

        // Fetch Instructor Stats
        const statsRes = await fetch(`http://localhost:5000/api/courses/${courseId}/instructor-stats`);
        if (statsRes.ok) {
            instructorStats.value = await statsRes.json();
        }

        // Fetch Related Lectures
        const relatedRes = await fetch(`http://localhost:5000/api/courses/${courseId}/related`);
        if (relatedRes.ok) {
            relatedLectures.value = await relatedRes.json();
        }

        // Fetch Comments
        const commentsRes = await fetch(`http://localhost:5000/api/courses/${courseId}/comments`);
        if (commentsRes.ok) {
            comments.value = await commentsRes.json();
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const setupSocket = () => {
    socket = io('http://localhost:5000');
    
    socket.emit('join_lecture', courseId);

    socket.on('new_comment', (newComment) => {
        if (newComment.parent_id) {
            // It's a reply
            const parent = comments.value.find(c => c._id === newComment.parent_id);
            if (parent) {
                parent.replies.push(newComment);
            }
        } else {
            // It's a root comment
            newComment.replies = [];
            comments.value.unshift(newComment);
        }
    });
};

const sendComment = (parentId = null) => {
    if (!currentUser.value) {
        alert('Vui lòng đăng nhập để bình luận!');
        return;
    }

    const text = parentId ? replyText.value : newCommentText.value;
    if (!text.trim()) return;

    socket.emit('send_comment', {
        course_id: courseId,
        user_id: currentUser.value.id,
        text: text,
        parent_id: parentId
    });

    if (parentId) {
        replyText.value = '';
        activeReplyId.value = null;
    } else {
        newCommentText.value = '';
    }
};

onMounted(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        currentUser.value = JSON.parse(userStr);
    }

    if (courseId) {
        fetchLectureData();
        setupSocket();
    }
});

onUnmounted(() => {
    if (socket) {
        socket.disconnect();
    }
});

</script>

<style scoped>
.lecture-detail-page {
  max-width: 1400px;
  margin: 0 auto;
  animation: fadeIn 0.4s ease;
}

.back-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-bottom: 1rem;
  font-size: 1rem;
  transition: color 0.2s;
}

.back-btn:hover {
  color: var(--primary);
}

.content-layout {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
}

/* Video Player */
.video-container {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  background: linear-gradient(45deg, #1e293b, #0f172a);
}

.play-icon {
  font-size: 4rem;
  color: var(--primary);
  opacity: 0.8;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.play-icon:hover {
  transform: scale(1.1);
  opacity: 1;
}

/* Video Info */
.video-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-main);
}

.video-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.instructor-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  text-transform: uppercase;
}

.instructor-details {
  display: flex;
  flex-direction: column;
}

.instructor-details .name {
  font-weight: 600;
  color: var(--text-main);
}

.instructor-details .subscribers {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.subscribe-btn {
  background: var(--text-main);
  color: var(--bg-main);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 1rem;
  transition: opacity 0.2s;
}

.subscribe-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.subscribe-btn:disabled {
  background: var(--text-muted);
  cursor: not-allowed;
  opacity: 0.7;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  background: var(--bg-sub);
  border: 1px solid var(--border);
  color: var(--text-main);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.action-btn:hover {
  background: var(--border);
}

.video-description {
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  background: var(--bg-sub);
  border: 1px solid var(--border);
}

.views-date {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.desc-text {
  font-size: 0.95rem;
  line-height: 1.5;
  white-space: pre-wrap;
}

/* Comments */
.comments-count {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.comment-input-area, .reply-input-area {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.reply-input-area {
    margin-top: 1rem;
    margin-bottom: 0;
}

.input-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.comment-input {
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--border);
  background: transparent;
  padding: 0.5rem 0;
  color: var(--text-main);
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.comment-input:focus {
  border-bottom-color: var(--primary);
}

.input-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.btn-cancel, .btn-submit {
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
}

.btn-cancel {
  background: transparent;
  color: var(--text-main);
}

.btn-submit {
  background: var(--primary);
  color: white;
}

.btn-cancel:hover {
  background: var(--border);
}

.btn-submit:hover {
  background: var(--primary-dark);
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.comment {
  display: flex;
  gap: 1rem;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.comment-author {
  font-weight: 600;
  font-size: 0.95rem;
}

.comment-time {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.instructor-badge {
  background: var(--primary);
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 0.5rem;
  font-weight: bold;
}

.instructor-name {
  color: var(--primary-dark);
}

.instructor-avatar {
  background: var(--primary);
}

.comment-text {
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.reply-to {
  color: var(--primary);
  font-weight: 500;
  margin-right: 0.25rem;
}

.comment-actions {
  display: flex;
  gap: 1rem;
}

.action-small {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;
}

.action-small:hover {
  color: var(--text-main);
}

.replies-list {
  margin-top: 1rem;
  margin-left: 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.reply-avatar {
  width: 32px;
  height: 32px;
  font-size: 0.9rem;
}

/* Recommendations */
.section-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.recmd-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.recmd-item {
  display: flex;
  gap: 0.75rem;
  cursor: pointer;
}

.recmd-thumb {
  width: 140px;
  border-radius: 8px;
  object-fit: cover;
}

.recmd-info {
  display: flex;
  flex-direction: column;
}

.recmd-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.recmd-author, .recmd-meta {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin: 0;
}

.no-data {
    font-size: 0.9rem;
    color: var(--text-muted);
}

/* Responsive */
@media (max-width: 1024px) {
  .content-layout {
    grid-template-columns: 1fr;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Dark Theme Adjustments */
html.theme-dark .subscribe-btn {
  background: white;
  color: black;
}

html.theme-dark .video-description {
  background: rgba(30, 41, 59, 0.5);
}
</style>
