await window.saveMeal(data.name, data.calories, data.protein);
                    closeModal();
                } catch (e) {
                    showToast("AI Error. Check Vercel Logs.");
                    closeModal();
                }
            };
            reader.readAsDataURL(file);
        };

        window.saveMeal = async (name, kcal, prot) => {
            if (!currentUser) return;
            const path = collection(db, 'artifacts', appId, 'users', currentUser.uid, 'meals');
            await addDoc(path, { name, calories: Number(kcal), protein: Number(prot), timestamp: Timestamp.now() });
        };

        window.deleteEntry = async (id) => {
            await deleteDoc(doc(db, 'artifacts', appId, 'users', currentUser.uid, 'meals', id));
        };

        window.openModal = () => document.getElementById('modal-overlay').classList.remove('hidden');
        window.closeModal = () => {
            document.getElementById('modal-overlay').classList.add('hidden');
            document.getElementById('form-view').classList.remove('hidden');
            document.getElementById('loading-view').classList.add('hidden');
            document.getElementById('file-input').value = '';
        };

        window.submitManual = () => {
            const n = document.getElementById('meal-name').value;
            const k = document.getElementById('meal-kcal').value;
            const p = document.getElementById('meal-prot').value;
            if (n) window.saveMeal(n, k || 0, p || 0);
            closeModal();
        };

        function showToast(msg) {
            const t = document.getElementById('toast');
            t.innerText = msg; t.classList.remove('hidden');
            setTimeout(() => t.classList.add('hidden'), 3000);
        }
    </script>
</body>
</html>
