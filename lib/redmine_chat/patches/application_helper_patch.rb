module RedmineChat
  module ApplicationHelperPatch
    def self.included(base) # :nodoc:
      base.module_eval do
        unloadable

        def gravatar_image_tag(email, size = 55)
          email = 'anonymous@example.com' unless email.present?
          hash = Digest::MD5.hexdigest(email)

          image_tag "http://www.gravatar.com/avatar/#{hash}?s=#{size}&d=identicon"
        end
      end
    end

  end
end
ApplicationHelper.send(:include, RedmineChat::ApplicationHelperPatch)
