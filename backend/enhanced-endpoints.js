// backend/enhanced-endpoints.js - Additional API endpoints
// Note: app, io, and integrationService are provided by main.js as global variables

// Get integration status
app.get('/api/integrations/status', async (req, res) => {
  try {
    console.log('🔗 Checking integration status...');
    
    const status = await integrationService.getAllStatus();
    
    res.json({
      success: true,
      integrations: status
    });
  } catch (error) {
    console.error('❌ Failed to get integration status:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      integrations: {}
    });
  }
});

// Get Fireflies meetings
app.get('/api/fireflies/meetings', async (req, res) => {
  try {
    console.log('🎙️ Fetching Fireflies meetings...');
    
    const result = await integrationService.getFirefliesMeetings();
    
    if (result && result.success) {
      res.json({
        success: true,
        meetings: result.meetings || [],
        count: result.meetings?.length || 0
      });
    } else {
      // Return demo data when service fails
      res.json({
        success: true,
        meetings: [
          {
            id: 'demo-1',
            title: 'Weekly Team Standup',
            date: new Date().toISOString(),
            duration: '30m',
            attendees: 5,
            actionItems: ['Review sprint goals', 'Update client on progress', 'Schedule design review']
          },
          {
            id: 'demo-2', 
            title: 'Client Discovery Call - TechCorp',
            date: new Date(Date.now() - 24*60*60*1000).toISOString(),
            duration: '45m',
            attendees: 3,
            actionItems: ['Send proposal draft', 'Schedule technical demo']
          },
          {
            id: 'demo-3',
            title: 'Product Strategy Meeting',
            date: new Date(Date.now() - 2*24*60*60*1000).toISOString(),
            duration: '60m',
            attendees: 8,
            actionItems: ['Finalize Q1 roadmap', 'Research competitor features', 'Update pricing model']
          }
        ],
        count: 3,
        message: 'Using demo data - configure Fireflies API to see real meetings'
      });
    }
  } catch (error) {
    console.error('❌ Failed to get Fireflies meetings:', error);
    res.status(200).json({
      success: true,
      meetings: [],
      count: 0
    });
  }
});

// Test individual integrations
app.get('/api/test/:integration', async (req, res) => {
  try {
    const { integration } = req.params;
    console.log(`🧪 Testing ${integration} integration...`);
    
    const result = await integrationService.testIntegration(integration);
    
    res.json({
      success: result.success,
      message: result.message || 'Test completed',
      error: result.error,
      data: result.data
    });
  } catch (error) {
    console.error(`❌ Failed to test ${req.params.integration}:`, error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

console.log('🔧 Enhanced endpoints loaded with Fireflies integration');
