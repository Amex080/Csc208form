// Retrieve staffData from localStorage
var staffDataJSON = localStorage.getItem('staffData');
if (staffDataJSON) {
    var staffData = JSON.parse(staffDataJSON);
    populateResume(staffData);

    // Optionally, clear the data from localStorage after use
    // localStorage.removeItem('staffData');
} else {
    alert('No staff data found. Please fill out the form first.');
    window.location.href = 'index.html'; // Replace with your actual form page filename
}

// Function to populate the resume template with staff data
function populateResume(data) {
    document.getElementById('staffName').innerText = data.name;
    var positionText = data.position ? data.position : "Staff";
    document.getElementById('staffPosition').innerText = positionText + ", Department of " + data.department;
    document.getElementById('staffStatus').innerText = "Status: " + data.status;
    document.getElementById('staffEmail').innerHTML = "<strong>Email:</strong> " + data.email;
    document.getElementById('staffPhone').innerHTML = "<strong>Phone:</strong> " + data.phone;
    document.getElementById('staffCode').innerHTML = "<strong>Staff Code/ID:</strong> " + (data.staffCode || "N/A");
    document.getElementById('personalStatementContent').innerText = data.personalStatement || "N/A";
    document.getElementById('specializationContent').innerText = data.specialization || "N/A";
    document.getElementById('qualificationContent').innerText = data.qualification || "N/A";
    document.getElementById('degreeContent').innerText = data.degree || "N/A";
    document.getElementById('universityContent').innerText = data.university || "N/A";
    document.getElementById('skillsPercentageContent').innerText = data.skillsPercentage || "N/A";
    document.getElementById('motivationContent').innerText = data.motivation || "N/A";
    document.getElementById('favoriteGroupContent').innerText = data.favoriteGroup || "N/A";
    document.getElementById('favoriteDiscussionContent').innerText = data.favoriteDiscussion || "N/A";
    document.getElementById('bestExperienceContent').innerText = data.bestExperience || "N/A";

    // Show Welcome Address if applicable
    if (data.welcomeAddress) {
        document.getElementById('welcomeAddressContent').innerText = data.welcomeAddress;
        document.getElementById('welcomeAddressSection').style.display = 'block';
    }

    // Set profile photo
    var profilePhoto = document.getElementById('profilePhoto');
    profilePhoto.src = data.photo || 'default_photo.jpg'; // Use a default image if none provided

    // Populate skills
    var skillsContent = document.getElementById('skillsContent');
    skillsContent.innerHTML = ''; // Clear existing content
    data.skills.forEach(function(skill) {
        var skillSpan = document.createElement('span');
        skillSpan.innerText = skill;
        skillsContent.appendChild(skillSpan);
    });

    // Populate hobbies
    var hobbiesContent = document.getElementById('hobbiesContent');
    hobbiesContent.innerHTML = ''; // Clear existing content
    data.hobbies.forEach(function(hobby) {
        var hobbySpan = document.createElement('span');
        hobbySpan.innerText = hobby;
        hobbiesContent.appendChild(hobbySpan);
    });

    // Populate social media links
    var socialMediaLinks = document.getElementById('socialMediaLinks');
    socialMediaLinks.innerHTML = ''; // Clear existing content

    if (data.socialMedia.facebook) {
        var fbLink = document.createElement('a');
        fbLink.href = "https://www.facebook.com/" + data.socialMedia.facebook;
        fbLink.target = "_blank";
        fbLink.innerHTML = '<i class="fab fa-facebook"></i>';
        socialMediaLinks.appendChild(fbLink);
    }
    if (data.socialMedia.twitter) {
        var twitterLink = document.createElement('a');
        twitterLink.href = "https://www.twitter.com/" + data.socialMedia.twitter;
        twitterLink.target = "_blank";
        twitterLink.innerHTML = '<i class="fab fa-twitter"></i>';
        socialMediaLinks.appendChild(twitterLink);
    }
    if (data.socialMedia.instagram) {
        var igLink = document.createElement('a');
        igLink.href = "https://www.instagram.com/" + data.socialMedia.instagram;
        igLink.target = "_blank";
        igLink.innerHTML = '<i class="fab fa-instagram"></i>';
        socialMediaLinks.appendChild(igLink);
    }
    if (data.socialMedia.youtube) {
        var ytLink = document.createElement('a');
        ytLink.href = "https://www.youtube.com/" + data.socialMedia.youtube;
        ytLink.target = "_blank";
        ytLink.innerHTML = '<i class="fab fa-youtube"></i>';
        socialMediaLinks.appendChild(ytLink);
    }
}

// Function to send the resume data via email using EmailJS
function sendEmail() {
// Prepare the email parameters
var emailParams = {
    to_email: 'Saheedkareem815@gmail.com', // Replace with the recipient's email address
    name: staffData.name,
    position: staffData.position,
    department: staffData.department,
    status: staffData.status,
    email: staffData.email,
    phone: staffData.phone,
    staffCode: staffData.staffCode || 'N/A',
    personalStatement: staffData.personalStatement || 'N/A',
    specialization: staffData.specialization || 'N/A',
    qualification: staffData.qualification || 'N/A',
    degree: staffData.degree || 'N/A',
    university: staffData.university || 'N/A',
    skillsPercentage: staffData.skillsPercentage || 'N/A',
    motivation: staffData.motivation || 'N/A',
    favoriteGroup: staffData.favoriteGroup || 'N/A',
    favoriteDiscussion: staffData.favoriteDiscussion || 'N/A',
    bestExperience: staffData.bestExperience || 'N/A',
    welcomeAddress: staffData.welcomeAddress || '',
    skills: staffData.skills,
    hobbies: staffData.hobbies,
    socialMedia: staffData.socialMedia
};

// Send the email using EmailJS
emailjs.send('service_a8qfspj', 'template_q6v3jpm', emailParams)
    .then(function(response) {
        alert('Email sent successfully!');
    }, function(error) {
        alert('Failed to send email. Error: ' + JSON.stringify(error));
    });
}


// Function to generate the HTML content for the email
function generateEmailContent() {
    var content = `
        <h1>${staffData.name}</h1>
        <h2>${staffData.position}, Department of ${staffData.department}</h2>
        <p><strong>Status:</strong> ${staffData.status}</p>
        <p><strong>Email:</strong> ${staffData.email}</p>
        <p><strong>Phone:</strong> ${staffData.phone}</p>
        <p><strong>Staff Code/ID:</strong> ${staffData.staffCode || 'N/A'}</p>
        <h3>Personal Statement</h3>
        <p>${staffData.personalStatement || 'N/A'}</p>
        <h3>Area of Specialization</h3>
        <p>${staffData.specialization || 'N/A'}</p>
        <h3>Qualifications</h3>
        <p>${staffData.qualification || 'N/A'}</p>
        <p><strong>Degree:</strong> ${staffData.degree || 'N/A'}</p>
        <p><strong>University:</strong> ${staffData.university || 'N/A'}</p>
        <h3>Professional Skills</h3>
        <p>${staffData.skills.join(', ')}</p>
        <p><strong>Skills Percentage Level:</strong> ${staffData.skillsPercentage || 'N/A'}</p>
        <h3>Hobbies</h3>
        <p>${staffData.hobbies.join(', ')}</p>
        <h3>Motivation</h3>
        <p>${staffData.motivation || 'N/A'}</p>
        <h3>Favorite Working/Association Group</h3>
        <p>${staffData.favoriteGroup || 'N/A'}</p>
        <h3>Favorite Discussion Group</h3>
        <p>${staffData.favoriteDiscussion || 'N/A'}</p>
        <h3>Best Life Experience</h3>
        <p>${staffData.bestExperience || 'N/A'}</p>
    `;

    // Include Welcome Address if available
    if (staffData.welcomeAddress) {
        content += `
            <h3>Welcome Address</h3>
            <p>${staffData.welcomeAddress}</p>
        `;
    }

    // Include Social Media Links
    content += '<h3>Social Media Links</h3><p>';
    if (staffData.socialMedia.facebook) {
        content += `Facebook: https://www.facebook.com/${staffData.socialMedia.facebook}<br>`;
    }
    if (staffData.socialMedia.twitter) {
        content += `Twitter: https://www.twitter.com/${staffData.socialMedia.twitter}<br>`;
    }
    if (staffData.socialMedia.instagram) {
        content += `Instagram: https://www.instagram.com/${staffData.socialMedia.instagram}<br>`;
    }
    if (staffData.socialMedia.youtube) {
        content += `YouTube: https://www.youtube.com/${staffData.socialMedia.youtube}<br>`;
    }
    content += '</p>';

    // Note: Including the photo in the email can be complex due to size limitations and email client support.

    return content;
}