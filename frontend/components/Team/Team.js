// ===================================
// TEAM COMPONENT JAVASCRIPT
// ===================================
class TeamComponent {
    constructor() {
        this.init();
    }

    init() {
        this.setupMemberAnimations();
        this.setupSocialLinkInteractions();
        this.setupScrollAnimations();
        this.setupBioExpansion();
        this.setupAnalytics();
    }

    // Setup team member animations
    setupMemberAnimations() {
        const teamMember = document.querySelector('.team-component .team-member');
        
        if (teamMember) {
            teamMember.addEventListener('mouseenter', () => {
                this.animateTeamMember(teamMember, true);
            });
            
            teamMember.addEventListener('mouseleave', () => {
                this.animateTeamMember(teamMember, false);
            });
        }
    }

    // Animate team member card
    animateTeamMember(member, isHover) {
        const image = member.querySelector('.member-image');
        const overlay = member.querySelector('.member-overlay');
        const socialLinks = member.querySelectorAll('.social-links a');
        
        if (isHover) {
            image.style.transform = 'scale(1.05)';
            overlay.style.opacity = '1';
            
            socialLinks.forEach((link, index) => {
                setTimeout(() => {
                    link.style.transform = 'translateY(0) scale(1)';
                    link.style.opacity = '1';
                }, index * 100);
            });
        } else {
            image.style.transform = 'scale(1)';
            overlay.style.opacity = '0';
            
            socialLinks.forEach(link => {
                link.style.transform = 'translateY(10px) scale(0.8)';
                link.style.opacity = '0';
            });
        }
    }

    // Setup social link interactions
    setupSocialLinkInteractions() {
        const socialLinks = document.querySelectorAll('.team-component .social-links a');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleSocialLinkClick(link, e);
            });
        });
    }

    // Handle social link click
    handleSocialLinkClick(link, event) {
        const platform = this.getSocialPlatform(link);
        const memberName = 'Siseko Makomazi';
        
        // Track analytics
        this.trackTeamInteraction(memberName, `social_${platform}`);
        
        // Visual feedback
        link.style.transform = 'scale(0.9)';
        setTimeout(() => {
            link.style.transform = 'scale(1)';
        }, 150);
        
        // Add ripple effect
        this.createRippleEffect(event, link);
    }

    // Get social platform name
    getSocialPlatform(link) {
        const icon = link.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-linkedin')) return 'linkedin';
            if (icon.classList.contains('fa-github')) return 'github';
            if (icon.classList.contains('fa-envelope')) return 'email';
        }
        return 'unknown';
    }

    // Create ripple effect
    createRippleEffect(event, element) {
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('span');
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.transform = 'scale(4)';
            ripple.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Setup scroll animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        const teamMember = document.querySelector('.team-component .team-member');
        if (teamMember) {
            teamMember.style.opacity = '0';
            teamMember.style.transform = 'translateY(30px)';
            teamMember.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(teamMember);
        }
    }

    // Setup bio expansion functionality
    setupBioExpansion() {
        const bio = document.querySelector('.team-component .bio');
        
        if (bio) {
            // Check if bio needs truncation
            const fullBio = bio.textContent.trim();
            const maxLength = 150;
            
            if (fullBio.length > maxLength) {
                const truncatedBio = fullBio.substring(0, maxLength) + '...';
                bio.textContent = truncatedBio;
                bio.style.cursor = 'pointer';
                bio.style.position = 'relative';
                
                // Add "Read more" indicator
                const readMore = document.createElement('span');
                readMore.className = 'bio-read-more';
                readMore.textContent = ' Read more';
                readMore.style.color = 'var(--electric-blue)';
                readMore.style.fontWeight = '600';
                readMore.style.cursor = 'pointer';
                
                bio.appendChild(readMore);
                
                // Setup click handler
                readMore.addEventListener('click', () => {
                    this.expandBio(bio, fullBio, readMore);
                });
                
                // Track bio truncation
                this.trackTeamInteraction('Siseko Makomazi', 'bio_truncated');
            }
        }
    }

    // Expand bio to full text
    expandBio(bioElement, fullText, readMoreElement) {
        bioElement.textContent = fullText;
        bioElement.style.cursor = 'default';
        
        if (readMoreElement) {
            readMoreElement.remove();
        }
        
        // Animate expansion
        bioElement.style.transition = 'opacity 0.3s ease';
        bioElement.style.opacity = '0.7';
        
        setTimeout(() => {
            bioElement.style.opacity = '1';
        }, 100);
        
        // Track bio expansion
        this.trackTeamInteraction('Siseko Makomazi', 'bio_expanded');
    }

    // Setup analytics tracking
    setupAnalytics() {
        // Track team member impressions
        const teamMember = document.querySelector('.team-component .team-member');
        
        if (teamMember) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.trackTeamInteraction('Siseko Makomazi', 'impression');
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(teamMember);
        }
        
        // Track social link hover
        const socialLinks = document.querySelectorAll('.team-component .social-links a');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const platform = this.getSocialPlatform(link);
                this.trackTeamInteraction('Siseko Makomazi', `social_hover_${platform}`);
            });
        });
    }

    // Track team interactions
    trackTeamInteraction(memberName, action) {
        console.log(`Team interaction: ${memberName} - ${action}`);
        
        // Integration with analytics service would go here
        if (typeof gtag !== 'undefined') {
            gtag('event', 'team_interaction', {
                member_name: memberName,
                action: action,
                category: 'team'
            });
        }
    }

    // Add CSS for ripple animation
    setupRippleCSS() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .bio-read-more {
                transition: color 0.3s ease;
            }
            
            .bio-read-more:hover {
                color: var(--white);
                text-decoration: underline;
            }
        `;
        document.head.appendChild(style);
    }

    // Public method to get team member info
    getMemberInfo() {
        return {
            name: 'Siseko Makomazi',
            position: 'Founder & CEO',
            bio: 'Passionate entrepreneur from Kayamandi, Stellenbosch, with a vision to bridge the digital divide and create opportunities through technology. Leading Calvin Tech Solutions to empower South African businesses with practical, scalable digital solutions.',
            social: {
                linkedin: 'https://linkedin.com/in/siseko-makomazi',
                github: 'https://github.com/SLMakomazi',
                email: 'mailto:info@calvintech.com'
            }
        };
    }

    // Public method to update team member info
    updateMemberInfo(memberData) {
        const nameElement = document.querySelector('.team-component .member-info h3');
        const positionElement = document.querySelector('.team-component .position');
        const bioElement = document.querySelector('.team-component .bio');
        
        if (nameElement) nameElement.textContent = memberData.name;
        if (positionElement) positionElement.textContent = memberData.position;
        if (bioElement) bioElement.textContent = memberData.bio;
        
        // Update social links
        if (memberData.social) {
            const linkedinLink = document.querySelector('.team-component .social-links a[href*="linkedin"]');
            const githubLink = document.querySelector('.team-component .social-links a[href*="github"]');
            const emailLink = document.querySelector('.team-component .social-links a[href*="mailto"]');
            
            if (linkedinLink && memberData.social.linkedin) {
                linkedinLink.href = memberData.social.linkedin;
            }
            if (githubLink && memberData.social.github) {
                githubLink.href = memberData.social.github;
            }
            if (emailLink && memberData.social.email) {
                emailLink.href = memberData.social.email;
            }
        }
    }

    // Public method to destroy team component
    destroy() {
        // Remove event listeners and clean up
        const teamMember = document.querySelector('.team-component .team-member');
        const socialLinks = document.querySelectorAll('.team-component .social-links a');
        const readMoreBtn = document.querySelector('.team-component .bio-read-more');
        
        if (teamMember) {
            teamMember.removeEventListener('mouseenter', this.setupMemberAnimations);
            teamMember.removeEventListener('mouseleave', this.setupMemberAnimations);
        }
        
        socialLinks.forEach(link => {
            link.removeEventListener('click', this.handleSocialLinkClick);
        });
        
        if (readMoreBtn) {
            readMoreBtn.removeEventListener('click', this.expandBio);
        }
        
        // Remove ripple styles
        const rippleStyle = document.querySelector('style[data-team-ripple]');
        if (rippleStyle) {
            rippleStyle.remove();
        }
    }
}

// Initialize team component when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TeamComponent();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TeamComponent;
}
