// backend/src/services/integrationService.js
const FirefliesService = require('./firefliesService');

class IntegrationService {
  constructor() {
    // Initialize Fireflies service
    this.firefliesService = new FirefliesService();
    this.firefliesService.initialize();
    
    console.log('🔧 IntegrationService initialized with Fireflies');
  }

  async getAllStatus() {
    try {
      const fireflies = await this.testFirefliesConnection();
      
      return {
        fireflies,
        gmail: { success: false, error: 'Not configured yet' },
        slack: { success: false, error: 'Not configured yet' },
        notion: { success: false, error: 'Not configured yet' },
        calendar: { success: false, error: 'Not configured yet' },
        supabase: { success: false, error: 'Not configured yet' },
        openai: { success: false, error: 'Not configured yet' },
        claude: { success: false, error: 'Not configured yet' }
      };
    } catch (error) {
      console.error('Failed to get integration status:', error);
      return {};
    }
  }

  async testFirefliesConnection() {
    try {
      return await this.firefliesService.testConnection();
    } catch (error) {
      return {
        success: false,
        error: `Fireflies failed: ${error.message}`
      };
    }
  }

  async getFirefliesMeetings() {
    try {
      return await this.firefliesService.getMeetings();
    } catch (error) {
      console.error('Failed to get Fireflies meetings:', error);
      return {
        success: false,
        error: error.message,
        meetings: []
      };
    }
  }

  async testIntegration(integration) {
    switch (integration.toLowerCase()) {
      case 'fireflies':
        return await this.testFirefliesConnection();
      default:
        return {
          success: false,
          error: `Integration ${integration} not implemented yet`
        };
    }
  }
}

module.exports = IntegrationService;
