# Contributing to EV Charging Scheduler

Terima kasih atas minat Anda untuk berkontribusi pada proyek EV Charging Scheduler! 

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 atau lebih baru)
- npm atau yarn
- Expo CLI
- Git

### Setup Development Environment
1. Fork repository ini
2. Clone fork Anda:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Fe-Scheduling.git
   cd Fe-Scheduling
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

5. Start development server:
   ```bash
   npm start
   ```

## 📋 Development Guidelines

### Code Style
- Gunakan TypeScript untuk semua file JavaScript
- Ikuti naming convention yang sudah ada
- Gunakan ESLint dan Prettier (akan dikonfigurasi)
- Tulis komentar untuk logika yang kompleks

### Commit Message Format
Gunakan format conventional commits:
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Contoh:
- `feat: add vehicle tracking component`
- `fix: resolve WebSocket connection issue`
- `docs: update README with deployment instructions`
- `style: format LocationInput component`
- `refactor: optimize map rendering performance`

### Branch Naming
- `feature/feature-name` - untuk fitur baru
- `bugfix/bug-description` - untuk perbaikan bug
- `hotfix/critical-fix` - untuk perbaikan darurat
- `docs/documentation-update` - untuk update dokumentasi

## 🧪 Testing

### Manual Testing
1. Start mock server: `npm run mock-server`
2. Start app: `npm start`
3. Test semua flow:
   - [ ] Input lokasi asal dan tujuan
   - [ ] WebSocket connection
   - [ ] Route display di peta
   - [ ] Charging schedule list
   - [ ] Vehicle status updates
   - [ ] Tab navigation (Map/Schedule)

### Testing Checklist
- [ ] App berjalan tanpa error di Android
- [ ] App berjalan tanpa error di iOS
- [ ] WebSocket connection stable
- [ ] Map rendering dengan benar
- [ ] GPS location picker berfungsi
- [ ] Currency format sesuai (IDR)
- [ ] Date/time format sesuai timezone Indonesia

## 📝 Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Tulis code yang clean dan readable
   - Test perubahan Anda secara menyeluruh
   - Update dokumentasi jika diperlukan

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Buat PR dari branch Anda ke `main` branch
   - Berikan deskripsi yang jelas tentang perubahan
   - Lampirkan screenshot jika ada perubahan UI
   - Reference issue yang terkait jika ada

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Manual testing completed
- [ ] All existing functionality works
- [ ] New feature works as expected

## Screenshots (if applicable)
Add screenshots here

## Related Issues
Closes #issue_number
```

## 🐛 Reporting Bugs

Gunakan GitHub Issues dengan template berikut:

### Bug Report Template
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Device Info:**
 - Device: [e.g. iPhone 13, Samsung Galaxy S21]
 - OS: [e.g. iOS 15.0, Android 12]
 - App Version: [e.g. 1.0.0]

**Additional context**
Add any other context about the problem here.
```

## 💡 Feature Requests

Gunakan GitHub Issues dengan label "enhancement":

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
A clear description of alternative solutions.

**Additional context**
Add any other context or screenshots about the feature request.
```

## 📚 Documentation

### Code Documentation
- Semua komponen harus memiliki JSDoc comments
- Props interface harus didokumentasikan
- Complex functions harus memiliki komentar yang jelas

### README Updates
Jika perubahan Anda mempengaruhi:
- Installation process
- Configuration
- API usage
- New features

Pastikan untuk update README.md

## 🔄 Code Review Process

1. Semua PR akan direview oleh maintainer
2. Perubahan mungkin diminta sebelum merge
3. Pastikan semua check passing (CI/CD akan dikonfigurasi)
4. PR akan di-merge setelah approval

## 📞 Getting Help

- GitHub Issues untuk bug reports dan feature requests
- GitHub Discussions untuk pertanyaan umum
- Email maintainer untuk pertanyaan sensitive

## 📄 License

Dengan berkontribusi pada proyek ini, Anda setuju bahwa kontribusi Anda akan dilisensikan di bawah lisensi yang sama dengan proyek ini.

---

**Terima kasih telah berkontribusi! 🎉**
