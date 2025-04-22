// Character counter function
function countChars(textareaId, maxChars) {
    const textarea = document.getElementById(textareaId);
    const counter = document.getElementById(textareaId + 'Counter');
    const charCount = textarea.value.length;
    
    counter.textContent = charCount;
    
    if (charCount > maxChars) {
        counter.style.color = 'red';
        // Truncate to max characters
        textarea.value = textarea.value.substring(0, maxChars);
        counter.textContent = maxChars;
    } else {
        counter.style.color = 'inherit';
    }
}

// Form validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('staffForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            // Check character counts before submission
            const personalStatementChars = document.getElementById('personalStatement').value.length;
            const motivationChars = document.getElementById('motivation').value.length;
            const bestExperienceChars = document.getElementById('bestExperience').value.length;
            
            if (personalStatementChars < 1) {
                alert('Personal Statement must be at least 1 character');
                e.preventDefault();
                return;
            }
            
            if (personalStatementChars > 100) {
                alert('Personal Statement must be 100 characters or less');
                e.preventDefault();
                return;
            }
            
            if (motivationChars > 100) {
                alert('Motivation must be 100 characters or less');
                e.preventDefault();
                return;
            }
            
            if (bestExperienceChars > 100) {
                alert('Best Life Experience must be 100 characters or less');
                e.preventDefault();
                return;
            }
            
            // Continue with the rest of your form submission logic
        });
    }
});




// JavaScript code to handle form interactions

// Limit the number of checkboxes selected to 5
function limitCheckboxes(containerId, limit) {
    var checkboxes = document.querySelectorAll('#' + containerId + ' input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            var checkedCount = document.querySelectorAll('#' + containerId + ' input[type="checkbox"]:checked').length;
            if (checkedCount > limit) {
                this.checked = false;
                alert('You can select up to ' + limit + ' options.');
            }
        });
    });
}

limitCheckboxes('proSkills', 5);
limitCheckboxes('hobbies', 5);

// Show or hide the Welcome Address section based on Leadership Position selection
document.getElementById('leadershipPosition').addEventListener('change', function() {
    var welcomeSection = document.getElementById('welcomeAddressSection');
    if (this.value !== "") {
        welcomeSection.style.display = 'block';
    } else {
        welcomeSection.style.display = 'none';
    }
});

// Handle form submission
document.getElementById('staffForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Collect form data into an object
    var staffData = {
        name: document.getElementById('name').value,
        department: document.getElementById('department').value,
        position: document.getElementById('leadershipPosition').value || document.getElementById('status').value,
        status: document.getElementById('status').value,
        staffCode: document.getElementById('staffCode').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        personalStatement: document.getElementById('personalStatement').value,
        specialization: document.getElementById('specialization').value,
        qualification: document.getElementById('qualification').value,
        degree: document.getElementById('degree').value,
        university: document.getElementById('university').value,
        skillsPercentage: document.getElementById('skillsPercentage').value,
        motivation: document.getElementById('motivation').value,
        favoriteGroup: document.getElementById('favoriteGroup').value,
        favoriteDiscussion: document.getElementById('favoriteDiscussion').value,
        bestExperience: document.getElementById('bestExperience').value,
        socialMedia: {
            facebook: document.getElementById('facebook').value,
            twitter: document.getElementById('twitter').value,
            instagram: document.getElementById('instagram').value,
            youtube: document.getElementById('youtube').value
        },
        welcomeAddress: document.getElementById('welcomeAddress') ? document.getElementById('welcomeAddress').value : ''
    };

    // Get selected skills
    var proSkills = [];
    document.querySelectorAll('#proSkills input[type="checkbox"]:checked').forEach(function(checkbox) {
        proSkills.push(checkbox.value);
    });
    staffData.skills = proSkills;

    // Get selected hobbies
    var hobbies = [];
    document.querySelectorAll('#hobbies input[type="checkbox"]:checked').forEach(function(checkbox) {
        hobbies.push(checkbox.value);
    });
    staffData.hobbies = hobbies;

    // Handle photo upload
    var photoInput = document.getElementById('photo');
    var photoFile = photoInput.files[0];
    
    if (!photoFile) {
        alert('Please upload your Official/Smiling Picture.');
        return;
    }

    // Validate image size (max 2MB)
    if (photoFile.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
    }

    var reader = new FileReader();
    reader.onload = function(e) {
        staffData.photo = e.target.result;
        
        // Save staffData to localStorage
        localStorage.setItem('staffData', JSON.stringify(staffData));

        // Redirect to dashboard.html
        window.location.href = 'dashboard.html';
    };
    reader.readAsDataURL(photoFile);
});
